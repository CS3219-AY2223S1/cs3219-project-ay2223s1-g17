type TimerId = string;
type Timers = Record<TimerId, NodeJS.Timer>;
export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};
type Stopwatches = Record<
  TimerId,
  {
    interval: NodeJS.Timer | undefined;
    time: Time;
    isActive: boolean;
    isPaused: boolean;
  }
>;

export const timers: Timers = {};
export const stopwatches: Stopwatches = {};
