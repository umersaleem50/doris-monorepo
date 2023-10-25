import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import mainRouter from './mainRouter';
import { errorHandlerController } from '@org/controllers';
import dotenv from 'dotenv';
import makeStorage from './makeDIR';

dotenv.config({ path: path.join(__dirname, '/.env') });

makeStorage('/assets/products');
makeStorage('/assets/products/mobile');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1', mainRouter);

app.use(
  '/images/products',
  express.static(path.join(__dirname, '/assets/products'))
);

app.use(
  '/images/profile',
  express.static(path.join(__dirname, '/assets/profilePicture'))
);

app.use(
  '/images/products/small',
  express.static(path.join(__dirname, '/assets/products/mobile'))
);

app.use(errorHandlerController);

mongoose
  .connect('mongodb://127.0.0.1:27017/dorisshoes')
  .then(() => console.log('Datebase connected successfully!'))
  .catch((err) => {
    console.log('Error in connecting the database');
    console.log(err);
  });

app.listen(process.env.APP_PORT || 3001, () => {
  console.log(`Api is running on Port: ${process.env.APP_PORT || 3001}`);
});

module.exports = app;
