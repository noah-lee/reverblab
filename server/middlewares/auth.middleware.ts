import { RequestHandler } from 'express';

const verifyToken: RequestHandler = (req, res, next) => {};

const authMiddleware = {
  verifyToken,
};

export default authMiddleware;
