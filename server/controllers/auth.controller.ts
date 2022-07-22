import { RequestHandler } from 'express';

import User from '../models/user.model';

const register: RequestHandler = (req, res, next) => {

  // Use joi for validation
  
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
};

export {register as signup}