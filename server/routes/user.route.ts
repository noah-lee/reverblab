import express from 'express';

import authMiddleware from '../middlewares/auth.middleware';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.post(
  '/register',
  authMiddleware.verifyRegister,
  authController.register
);

router.post('/login', authMiddleware.verifyLogin, authController.login);

export default router;
