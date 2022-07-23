import express from 'express';

import userMiddleware from '../middlewares/user.middleware';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post(
  '/register',
  userMiddleware.verifyRegister,
  userController.register
);

router.post('/login', userMiddleware.verifyLogin, userController.login);

router.post('/test', userMiddleware.verifyToken)

export default router;
