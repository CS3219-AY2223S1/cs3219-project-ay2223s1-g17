import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import router from './routes';
import mongoose from 'mongoose';

const port = process.env.PORT || 8005;
// initialize express app
const app: Express = express();

// set up default mongoose connection
const mongoDbUrl = process.env.DB_URI;

mongoose.connect(mongoDbUrl ?? '');

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

// TODO: Might have to add chat-service in
const allowedOrigins = [
  'http://alb-peerprep-2137662650.ap-southeast-1.elb.amazonaws.com',
  'http://localhost:3000',
];

console.log(allowedOrigins);

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
