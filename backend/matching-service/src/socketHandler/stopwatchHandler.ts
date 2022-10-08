import { Socket } from 'socket.io';

import { InputOutput } from '..';
import { stopwatches, Time } from '../timers';

const handleTimer = (_: InputOutput, socket: Socket) => {
  const timer = setInterval(() => {
    const stopwatch = stopwatches[socket.id];
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
      socket.emit('timerTick', stopwatch);
    } else {
      clearInterval(interval);
    }

    stopwatch.interval = timer;
  }, 1000);
};

const onTimerStart = (io: InputOutput, socket: Socket) => () => {
  console.log('timer starting!');
  const stopwatch = stopwatches[socket.id];
  console.log('sw: ', stopwatch);
  if (!stopwatch)
    stopwatches[socket.id] = {
      interval: undefined,
      time: { seconds: 0, minutes: 0, hours: 0 },
      isActive: false,
      isPaused: false,
    };
  stopwatch.isActive = true;
  stopwatch.isPaused = false;
  handleTimer(io, socket);
};

const onTimerStop = (_: InputOutput, socket: Socket) => () => {
  const stopwatch = stopwatches[socket.id];
  stopwatch.isActive = false;
  stopwatch.isPaused = false;
  stopwatch.time = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  };
};

const onTimerPause = (_: InputOutput, socket: Socket) => () => {
  const stopwatch = stopwatches[socket.id];
  stopwatch.isPaused = true;
};

const onTimerResume = (_: InputOutput, socket: Socket) => () => {
  const stopwatch = stopwatches[socket.id];
  stopwatch.isPaused = false;
};

export const registerStopwatchHandler = (io: InputOutput, socket: Socket) => {
  socket.on('timerStart', onTimerStart(io, socket));
  socket.on('timerStop', onTimerStop(io, socket));
  socket.on('timerPause', onTimerPause(io, socket));
  socket.on('timerResume', onTimerResume(io, socket));
};
