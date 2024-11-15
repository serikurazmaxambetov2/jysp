import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',

  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,

  entities: [join(__dirname, '..', '**', '*.entity.{t,j}s')],
  migrations: [join(__dirname, 'migrations', '*')],
};

// Для миграций
export default new DataSource(dataSourceOptions);
