import { Sequelize } from 'sequelize';
import dbCongif from '../config/db.config';

const db = new Sequelize(dbCongif.DB, dbCongif.USER, dbCongif.PASSWORD, {
  host: dbCongif.HOST,
  dialect: dbCongif.DIALECT,
});

export default db;
