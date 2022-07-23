import 'dotenv/config';
import { Dialect } from 'sequelize/types';

const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER as string,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME as string,
  DIALECT: process.env.DB_DIALECT as Dialect,
};

export default dbConfig;
