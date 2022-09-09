import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import { Server } from 'socket.io';
import http from 'http';
import * as Users from './users';
import { User, Error } from '../server/types/socket';

const port = process.env.PORT || '8001';
// initialize express app
const app: Express = express();

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

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Socket connected successfully', socket.id);

  socket.on('join', ({ name, roomId }, cb) => {
    console.log(`User ${name} has joined the room!`);

    const res = Users.addUser({ id: socket.id, name, roomId });

    if ((res as Error).error) {
      return cb(res);
    }

    const user = res as User;

    socket.join(user.roomId);
    console.log('user id', socket.id);

    io.to(user.roomId).emit('roomData', {
      roomId: user.roomId,
      users: Users.usersInRoom(user.roomId),
    });

    cb();
  });

  socket.on('sendCode', (code: string) => {
    const user = Users.findUser(socket.id);

    if (!user) {
      return;
    }

    console.log(`code ${code}`);

    socket.broadcast.to(user.roomId).emit('code', code);
  });
});

app.listen(port, () => {
  console.log(`Socket.io Server is running at https://localhost:${port}`);
});
