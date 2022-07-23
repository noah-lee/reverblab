import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';
import jwtConfig from '../config/jwt.config';

const register: RequestHandler = async (req, res, next) => {
  // Validate new user (auth.middleware.validateNewUser)
  try {
    const user = await User.create(req.body);
    const accessToken = createToken({
      username: user.username,
      email: user.email,
    });
    res.status(201).json({ accessToken, expiresIn: jwtConfig.expiresIn });
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  // Validate user (auth.middleware.validateUser)
  try {
    const { username, email } = req.body;
    const accessToken = createToken({ username, email });
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
  username: string;
  email: string;
}

const createToken = (payload: JwtPayload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

export default userController;
