import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import userController from './src/user/user.controller.js';
import familyController from './src/family/family.controller.js';
import positionController from './src/position/position.controller.js';
import educationController from './src/education/education.controller.js';
import trainingController from './src/training/training.controller.js';
import titleController from './src/title/title.controller.js';

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
app.use('/api', familyController);
app.use('/api', positionController);
app.use('/api', educationController);
app.use('/api', trainingController);
app.use('/api', titleController);

app.listen(PORT, () => {
  console.log(`Express server listening on localhost: ${PORT}`);
});

export default app;
