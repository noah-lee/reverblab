import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

import userRouter from './routes/user.route';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(cors()); // Cross-origin resource sharing
app.use(helmet()); // Secure HTTP headers
app.use(morgan('tiny')); // Log HTTP
app.use(express.json()); // Parse request body with JSON
app.use(express.urlencoded({ extended: true })); // Parse request body with string/array

app.use('/api/user', userRouter);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
