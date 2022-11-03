import { Socket } from 'socket.io';
import { InputOutput } from '..';

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

type Stopwatches = Record<
  string,
  {
    interval: NodeJS.Timer | undefined;
    time: Time;
    isActive: boolean;
    isPaused: boolean;
  }
>;

const stopwatches: Stopwatches = {};

const handleTimer = (io: InputOutput, _: Socket, roomId: string) => {
  const timer = setInterval(() => {
    const stopwatch = stopwatches[roomId];
    const { interval, time, isActive, isPaused } = stopwatch;

    if (isActive && !isPaused) {
      const newMinute = time.seconds === 59;
      const newHour = time.minutes === 59 && newMinute;
      const newTime: Time = {
        hours: newHour ? time.hours + 1 : time.hours,
        minutes: newHour ? 0 : newMinute ? time.minutes + 1 : time.minutes,
        seconds: newMinute ? 0 : time.seconds + 1,
      };

      stopwatch.time = newTime;
    } else {
      clearInterval(interval);
    }
    io.to(roomId).emit('timerTick', stopwatch);
    stopwatch.interval = timer;
  }, 1000);
};

const onTimerStart =
  (io: InputOutput, socket: Socket, roomId: string) => () => {
    const stopwatch = {
      interval: undefined,
      time: { seconds: 0, minutes: 0, hours: 0 },
      isActive: true,
      isPaused: false,
    };
    stopwatches[roomId] = stopwatch;
    io.to(roomId).emit('timerLoad');
    handleTimer(io, socket, roomId);
  };

export const onTimerStop =
  (io: InputOutput, socket: Socket, roomId: string) => () => {
    const stopwatch = stopwatches[roomId];
    stopwatch.isActive = false;
    io.to(roomId).emit('timerLoad');

    if (stopwatch.isPaused) {
      stopwatch.isPaused = false;
      handleTimer(io, socket, roomId);
    }
  };

const onTimerPause = (io: InputOutput, __: Socket, roomId: string) => () => {
  const stopwatch = stopwatches[roomId];
  stopwatch.isPaused = true;
  io.to(roomId).emit('timerLoad');
};

const onTimerResume =
  (io: InputOutput, socket: Socket, roomId: string) => () => {
    const stopwatch = stopwatches[roomId];
    stopwatch.isPaused = false;
    io.to(roomId).emit('timerLoad');
    handleTimer(io, socket, roomId);
  };

export const registerStopwatchHandler = (
  io: InputOutput,
  socket: Socket,
  roomId: string
) => {
  socket.on('timerStart', onTimerStart(io, socket, roomId));
  socket.on('timerStop', onTimerStop(io, socket, roomId));
  socket.on('timerPause', onTimerPause(io, socket, roomId));
  socket.on('timerResume', onTimerResume(io, socket, roomId));
};
