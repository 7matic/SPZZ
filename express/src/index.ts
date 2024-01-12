import express from 'express'
import { userRouter } from './routes/user';
import { uploadRouter } from './routes/upload';
import { matchRouter } from './routes/match';
import { jobsRouter } from './routes/jobs';
import { companyRouter } from './routes/company';
import { messageRouter } from './routes/message';
import { positionRouter } from './routes/positions';
import { authRouter } from './routes/auth';

const app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use('/user', userRouter);
app.use(uploadRouter);
app.use(matchRouter);
app.use('/jobs', jobsRouter);
app.use('/company', companyRouter);
app.use('/messages', messageRouter);
app.use('/positions', positionRouter);
app.use('/auth', authRouter);

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
);