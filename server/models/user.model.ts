import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import bcrypt from 'bcryptjs'

import db from '../db';

interface UserAttributes
  extends Model<InferAttributes<UserAttributes>, InferCreationAttributes<UserAttributes>> {
  id: CreationOptional<number>;
  username: string;
  email: string;
  password: string;
}

// User model
const User = db.define<UserAttributes>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

// Hash password before creating new user
User.beforeCreate(async (user, options)=> {
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
})

export default User;
