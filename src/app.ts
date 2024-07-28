import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import golbalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(cookieParser());

app.use('/api/v1', router);

app.get('/test', async (req: Request, res: Response) => {
  // Promise.reject();
  const test = 'Hello World!';
  res.send(test);
});

app.use(golbalErrorHandler);
app.use(notFoundHandler);

export default app;
