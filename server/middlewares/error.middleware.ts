import { RequestHandler, ErrorRequestHandler } from 'express';
import { BaseError } from 'sequelize';

const notFound: RequestHandler = (req, res) => {
  res.sendStatus(404);
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Sequelize error
  if (err instanceof BaseError) return sequelizeError(err, req, res, next);

  // Catch-all error
  res.status(err.status || 500).json({
    message: err.message,
  });
};

const sequelizeError: ErrorRequestHandler = (err, req, res, next) => {
  // Update status code based on error
  res.status(500).json({ message: err.errors[0].message });
};

const errorMiddleware = {
  notFound,
  errorHandler,
};

export default errorMiddleware;
