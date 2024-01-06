import express from 'express'
import { userRouter } from './routes/user';
import { uploadRouter } from './routes/upload';
import { matchRouter } from './routes/match';
import { jobsRouter } from './routes/jobs';

const app = express()

app.use(express.json());
app.use('/user', userRouter);
app.use(uploadRouter);
app.use(matchRouter);
app.use('/jobs', jobsRouter);


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)