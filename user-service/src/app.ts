import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import router from './routes';
import mongoose from 'mongoose';

const port = process.env.PORT || '8001';
// initialize express app
const app: Express = express();

// set up default mongoose connection
const mongoDbUrl =
  process.env.ENV === 'production'
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDbUrl ?? '');

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

// middleware
// TODO: add hosted frontend domain here

const allowedOrigins = ['http://localhost:3000'];
// only allows requests coming in from allowed origins
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// enabled parsing of http only cookies
app.use(cookieParser());

// middlewares for mongoose
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routes
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
