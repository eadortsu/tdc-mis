import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { database as databaseConfig } from './api.config';

const { host, port, database, type, username, password } =
  databaseConfig() as Partial<
    PostgresConnectionCredentialsOptions & PostgresConnectionOptions
  >;

module.exports = {
  host,
  port,
  database,
  type,
  username,
  password,
  /* cache: {
     type: "redis",
     options: {
       host: "144.126.196.4",
       password: "T0T0Cap1$H",
       port: 6379
     }
   },*/
  /*  ssl: {
      ca: process.env.DB_SSL_CERT,
    },*/
  entities: ['src/**/models/*.entity.ts'],
  migrations: ['src/database/**/migrations/*.ts'],
  synchronize: true,
  logging: false,
  cli: {
    entitiesDir: 'src/**/models',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
  seeds: ['./src/database/seeds/**/*{.ts,.js}'],
  factories: ['./src/database/factories/**/*{.ts,.js}'],
};
