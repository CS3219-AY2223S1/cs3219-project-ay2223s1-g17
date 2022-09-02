import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { activeRooms, mediumWaitRoom, Room } from './match';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
// app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello World from matching-service');
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('matchingStart', (difficulty) => {
    let counter = 30;

    const countdown = setInterval(() => {
      socket.emit('matchCountdown', counter);
      counter--;
      if (counter === 0) {
        socket.emit('matchFail');
        clearInterval(countdown);
      }
    }, 1000);

    // if found a match, join active room
    if (mediumWaitRoom.length > 0) {
      // const roomId = uuidv4();
      const [waitingRoom] = mediumWaitRoom.splice(0, 1);
      const { id, user1, socket1, countdown1 } = waitingRoom;

      clearInterval(countdown1);
      clearInterval(countdown);

      socket.join(id);
      waitingRoom.user2 = uuidv4();
      activeRooms.push({
        id,
        user1,
        socket1,
      });

      // emit success match (find a way to tell the first guy)
      socket.emit('matchSuccess');
      socket1.emit('matchSuccess');
    }

    // if no match, join a waiting room
    const room = {
      id: uuidv4(),
      user1: uuidv4(),
      socket1: socket,
      countdown1: countdown,
    };

    socket.join(room.id);
    mediumWaitRoom.push(room);
  });
});

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
