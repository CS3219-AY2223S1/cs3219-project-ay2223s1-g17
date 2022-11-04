import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import router from './routes';
import mongoose from 'mongoose';

const port = process.env.PORT || '8005';
// initialize express app
const app: Express = express();

// set up default mongoose connection
const mongoDbUrl = process.env.DB_URI;

mongoose.connect(mongoDbUrl ?? '');

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

// middleware
// TODO: add hosted frontend domain here

// TODO: Might have to add chat-service in
const allowedOrigins = [
  'http://localhost:3000',
  'http://user-service:8001',
  'http://collaboration-service:8004',
];
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
  console.log(`History Service is running at http://localhost:${port}`);
});
