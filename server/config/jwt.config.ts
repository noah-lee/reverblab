import 'dotenv/config';
import { Secret } from 'jsonwebtoken';

const config = {
  secret: process.env.JWT_SECRET as Secret,
  expiresIn: 86400,
};

export default config;
