type TimerId = string;
type Timers = Record<TimerId, NodeJS.Timer>;
export const timers: Timers = {};
