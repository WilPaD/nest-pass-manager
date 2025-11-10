import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { DbError } from 'src/core/interfaces';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserResource } from './resources';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.usersRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 12),
      });
      await this.usersRepository.save(user);

      // Aquí estoy utilizando el user resource dto
      return {
        message: 'User created successfully',
        token: this.genJwtToken({
          email: user.email,
          id: user.id,
        }),
      };
    } catch (error) {
      this.handleDBError(error as DbError);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        isActive: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user: plainToInstance(UserResource, user, {
        excludeExtraneousValues: true,
      }),
      token: this.genJwtToken({
        email: user.email,
        id: user.id,
      }),
    };
  }

  checkAuthStatus(user: User) {
    const { ...restUser } = user;
    return {
      ...user,
      token: this.genJwtToken(restUser),
    };
  }

  private genJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    this.logger.log(`Generated JWT token for email: ${payload.email}`);
    return token;
  }

  private handleDBError(error: DbError): never {
    if (error.code === '23505') {
      this.logger.error(error);
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Please check server logs for more details',
    );
  }
}
