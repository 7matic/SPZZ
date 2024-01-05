import express from 'express'
import { userRouter } from './routes/user';
import { uploadRouter } from './routes/upload';
import { matchRouter } from './routes/match';

const app = express()

app.use(express.json());
app.use(userRouter);
app.use(uploadRouter);
app.use(matchRouter);


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)