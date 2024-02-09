import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import userController from './src/user/user.controller.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to SIMPEG PDM Sleman API');
});

app.use('/api', userController);

app.listen(PORT, () => {
  console.log(`Express server listening on localhost: ${PORT}`);
});

export default app;
