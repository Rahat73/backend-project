import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import golbalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/test', async (req: Request, res: Response) => {
  Promise.reject();
  // const test = 'Hello World!';
  // res.send(test);
});

app.use(golbalErrorHandler);
app.use(notFoundHandler);

export default app;
