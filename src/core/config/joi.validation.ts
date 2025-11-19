import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  // Environment
  APP_NAME: Joi.string().default('Invitations'),

  APP_ENV: Joi.string()
    .valid('local', 'develop', 'production', 'test')
    .default('develop'),
  APP_URL: Joi.string().default('http://localhost'),
  APP_PORT: Joi.number().port().default(3000),

  // Database Configuration
  DB_TYPE: Joi.string().valid('postgres').default('postgres'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().port().default(5432),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required().default('root'),
  DB_PASSWORD: Joi.string().empty(''),
  DB_SYNC: Joi.string().valid('true', 'false').default('false'),

  // JWT Configuration
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.string().default('1h'),
});
