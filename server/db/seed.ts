import db from '.';
import User from '../models/user.model';

const seed = async () => {
  await db.sync({ force: true });

  await User.create({
    username: 'Spongebob',
    email: 'bob@krustykrab.com',
    password: 'gary1234',
  });

  await db.close();
};

seed();
