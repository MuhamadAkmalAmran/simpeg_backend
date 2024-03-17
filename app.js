import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import userController from './src/user/user.controller.js';
import familyController from './src/family/family.controller.js';
import positionController from './src/position/position.controller.js';
import educationController from './src/education/education.controller.js';
import trainingController from './src/training/training.controller.js';
import titleController from './src/title/title.controller.js';
import achievementController from './src/achievement/achievement.controller.js';
import performanceController from './src/performance/performance.controller.js';
import errorMiddleware from './src/middleware/error-middleware.js';
import { authMiddleware } from './src/middleware/authentication.middleware.js';
import documentController from './src/document/document.controller.js';
import profileController from './src/profile/profile.controller.js';
import { multerErrorHandler } from './src/middleware/upload-file-middleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
}));
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to SIMPEG PDM Sleman API');
});

app.use('/api', userController);
app.use(authMiddleware);
app.use('/api', achievementController);
// app.use(adminMiddleware);
app.use('/api', profileController);
app.use('/api', familyController);
app.use('/api', positionController);
app.use('/api', educationController);
app.use('/api', trainingController);
app.use('/api', titleController);
app.use('/api', performanceController);
app.use('/api', documentController);
app.use(errorMiddleware);
app.use(multerErrorHandler);

app.listen(PORT, () => {
  console.log(`Express server listening on localhost: ${PORT}`);
});

export default app;
