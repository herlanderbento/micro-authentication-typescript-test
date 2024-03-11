import mongoose from 'mongoose';

mongoose
  .connect(String(process.env.DATABASE_URL))
  .then(() => console.log('Database connection!'));
