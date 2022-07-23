// Packages
import { RequestHandler } from 'express';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

import User from '../models/user.model';

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};

const verifyRegister: RequestHandler = async (req, res, next) => {
  try {
    await Promise.all([
      // Username validation
      body('username')
        .isLength({ min: 4 })
        .withMessage('Username must be at least 4 characters long.')
        .isAlpha()
        .withMessage('Username can only include letters.')
        .run(req),
      // Email validation
      body('email')
        .isEmail()
        .withMessage('Email provided is invalid.')
        .run(req),
      // Password validation
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
        .run(req),
      // Password confirm validation
      body('passwordConfirm')
        .custom((value, { req }) => {
          if (value !== req.body.password)
            throw new Error('Passwords do not match.');
          return true;
        })
        .run(req),
    ]);
    const validation = validationResult(req);
    if (!validation.isEmpty())
      return res.status(400).json({ message: validation.array()[0].msg });
    next();
  } catch (error) {
    next(error);
  }
};

const verifyLogin: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Validate username or email
    const user = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    });
    if (!user)
      return res.status(401).json({ message: 'Username/email not found.' });
    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ message: 'Wrong password.' });
    next();
  } catch (error) {
    next(error);
  }
};

const authMiddleware = {
  verifyToken,
  verifyLogin,
  verifyRegister,
};

export default authMiddleware;
