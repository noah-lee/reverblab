// Packages
import { RequestHandler } from 'express';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config';

import User from '../models/user.model';

const verifyRegister: RequestHandler = async (req, res, next) => {
  try {
    await Promise.all([
      // Validate username
      body('username')
        .isLength({ min: 4 })
        .withMessage('Username must be at least 4 characters long.')
        .isAlpha()
        .withMessage('Username can only include letters.')
        .run(req),
      // Validate email
      body('email')
        .isEmail()
        .withMessage('Email provided is invalid.')
        .run(req),
      // Validate password
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
        .run(req),
      // Validation password confirm
      body('passwordConfirm')
        .custom((value, { req }) => {
          if (value !== req.body.password)
            throw new Error('Passwords do not match.');
          return true;
        })
        .run(req),
    ]);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });
    next();
  } catch (error) {
    next(error);
  }
};

const verifyLogin: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Validate username & password
    const user = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    });
    if (!user)
      return res.status(401).json({ message: 'Invalid username/email.' });
    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ message: 'Wrong password.' });
    // Set res.locals
    res.locals.id = user.id;
    res.locals.username = user.username;
    res.locals.email = user.email;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) return res.sendStatus(401);
    jwt.verify(accessToken, jwtConfig.secret, (err, decoded) => {
      if (err) throw err;
      res.locals.decoded = decoded;
    });
    // Set res.locals
    const { id, username, email } = res.locals.decoded;
    res.locals.id = id;
    res.locals.username = username;
    res.locals.email = email;
    next();
  } catch (error) {
    next(error);
  }
};

const userMiddleware = {
  verifyLogin,
  verifyRegister,
  verifyToken,
};

export default userMiddleware;
