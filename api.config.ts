import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

export const loadDotEnv = (): string => {
  let envFilePath = '';

  switch (process.env.NODE_ENV) {
    case 'production':
      envFilePath = '.env.production';
      break;
    case 'staging':
      envFilePath = '.env.staging';
      break;
    case 'testing':
      envFilePath = '.env.testing';
      break;
    case 'development':
      envFilePath = '.env.development';
      break;
    default:
      envFilePath = '.env';
  }

  try {
    const key = dotenv.config({ path: `./${envFilePath}` });
    // console.log(key, 'dotenv loaded')
  } catch (error) {
    console.log(error, 'error loading dotenv');
  }

  return envFilePath;
};

loadDotEnv();

export const database = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: false,
  /*ssl: {
    ca: process.env.DB_SSL_CERT,
  },*/
  autoLoadEntities: true,
  synchronize: true,
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/migration/*.js'],
  /* cache: {
    type: "redis",
    options: {
      host: "144.126.196.4",
      password: "T0T0Cap1$H",
      port: 6379
    }
  },*/
});

export const auth = (): Record<string, any> => ({
  jwtSecret: process.env.JWT_SECRET,
  hashingSecret: process.env.HASHINGSECRET,
});

export const graphql = (): Record<string, any> => ({
  playground: process.env.PLAYGROUND == 'true',
  introspection: process.env.INTROSPECTION == 'true',
  debug: process.env.DEBUG == 'true',
});

export const app = (): Record<string, any> => ({
  port: Number(process.env.PORT),
});
