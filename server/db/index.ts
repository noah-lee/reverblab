import { Dialect, Sequelize } from 'sequelize';
import config from '../config/db.config';

const db = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT as Dialect,
});

export default db;
