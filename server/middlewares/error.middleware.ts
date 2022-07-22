// Packages
import { RequestHandler, ErrorRequestHandler } from 'express';

// Path not found handler
const notFound: RequestHandler = (req, res) => {
  res.status(404);
};

// Catch-all error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
  });
};

const errorMiddleware = {
  notFound,
  errorHandler,
};

export default errorMiddleware;
