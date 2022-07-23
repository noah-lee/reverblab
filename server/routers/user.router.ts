import express from 'express';

import userMiddleware from '../middlewares/user.middleware';
import userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post(
  '/register',
  userMiddleware.verifyRegister,
  userController.register
);

userRouter.post('/login', userMiddleware.verifyLogin, userController.login);

userRouter.post('/check', userMiddleware.verifyToken);

export default userRouter;
