import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';

const port = process.env.PORT || '8004';
// initialize express app
const app: Express = express();

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

// middlewares for mongoose
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
