import 'dotenv/config';
import { Secret } from 'jsonwebtoken';

const jwtConfig = {
  secret: process.env.JWT_SECRET as Secret,
  expiresIn: 86400,
};

export default jwtConfig;
