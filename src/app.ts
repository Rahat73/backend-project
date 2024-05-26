import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRouter } from './app/modules/student/student.route';
import { UserRouter } from './app/modules/user/user.route';
import golbalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/test', (req: Request, res: Response) => {
  const test = 'Hello World!';
  res.send(test);
});

app.use(golbalErrorHandler);
app.use(notFoundHandler);

export default app;
