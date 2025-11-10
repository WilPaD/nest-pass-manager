export const EnvConfig = () => ({
  environment: process.env.NODE_ENV || 'develop',
  postgres_db: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'pass-manager',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || null,
    synchronize: process.env.DB_SYNC === 'true',
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES || '1h',
  },
});
