import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateVaultDto } from './dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Vault } from './entities/vault.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/core/dto';
import { plainToInstance } from 'class-transformer';
import { VaultResponse } from './responses';

@Injectable()
export class VaultsService {
  private readonly logger = new Logger('VaultsService');
  constructor(
    @InjectRepository(Vault)
    private readonly vaultsRepository: Repository<Vault>,
  ) {}

  async findAll(paginationDto: PaginationDto, user: User) {
    const { limit = 10, offset = 0 } = paginationDto;

    const vaults: Vault[] = await this.vaultsRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      take: limit,
      skip: offset,
      relations: {
        user: true,
        items: true,
      },
    });

    return plainToInstance(VaultResponse, vaults, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(term: string, user: User) {
    let vault: Vault | null;

    if (isUUID(term)) {
      vault = await this.vaultsRepository.findOne({
        where: {
          id: term,
          user: {
            id: user.id,
          },
        },
        relations: {
          user: true,
        },
      });
    } else {
      const queryBuilder = this.vaultsRepository.createQueryBuilder('vault');
      vault = await queryBuilder
        .where('UPPER(vault.name) =:name AND vault.userId = :userId', {
          name: term.toUpperCase(),
          userId: user.id,
        })
        .leftJoinAndSelect('vault.user', 'user')
        .getOne();
    }

    if (!vault) {
      throw new NotFoundException(`Vault with id or name "${term}" not found`);
    }

    return plainToInstance(VaultResponse, vault, {
      excludeExtraneousValues: true,
    });
  }

  async create(createVaultDto: CreateVaultDto, user: User) {
    try {
      const vault = this.vaultsRepository.create({
        ...createVaultDto,
        user,
      });

      await this.vaultsRepository.save(vault);

      return `Vault ${vault.name} created successfully`;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
