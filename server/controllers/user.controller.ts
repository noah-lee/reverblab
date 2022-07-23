import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';
import jwtConfig from '../config/jwt.config';

const register: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const { id, username, email } = user;
    const accessToken = createToken({ id, username, email });
    res.status(201).json({ accessToken, expiresIn: jwtConfig.expiresIn });
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { id, username, email } = res.locals;
    const accessToken = createToken({ id, username, email });
    res.json({ accessToken, expiresIn: jwtConfig.expiresIn });
  } catch (error) {
    next(error);
  }
};

const userController = {
  register,
  login,
};

interface JwtPayload {
  id: number;
  username: string;
  email: string;
}

const createToken = (payload: JwtPayload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

export default userController;
