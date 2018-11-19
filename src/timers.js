import {
  CLOCKWISE,
  ANTICLOCKWISE,
  TIMER_STATUS_STOPED,
  TIMER_STATUS_PAUSED,
  TIMER_STATUS_FINISHED,
  TIMER_STATUS_RUNNING
} from './constants';

function validateTimerStatus(currentStatus, desiredStatus, invalidStatusList) {
  if (currentStatus === desiredStatus)
    throw new TypeError(
      `timer can't be updated to ${desiredStatus}, because it is already ${currentStatus}`
    );
  if (invalidStatusList.includes(currentStatus))
    throw new TypeError(
      `timer can't be updated to ${desiredStatus}, because it is ${currentStatus}`
    );
}

function createTimer(seconds = 25, isDecreasing = false, status = TIMER_STATUS_STOPED) {
  const direction = isDecreasing ? ANTICLOCKWISE : CLOCKWISE;
  return { durationInSeconds: seconds, timerDirection: direction, status };
}

function pauseTimer(timer) {
  validateTimerStatus(timer.status, TIMER_STATUS_PAUSED, [
    TIMER_STATUS_STOPED,
    TIMER_STATUS_FINISHED,
    TIMER_STATUS_PAUSED
  ]);

  return {
    durationInSeconds: timer.durationInSeconds,
    timerDirection: timer.timerDirection,
    status: TIMER_STATUS_PAUSED
  };
}

function startTimer(timer) {
  validateTimerStatus(timer.status, TIMER_STATUS_RUNNING, [
    TIMER_STATUS_FINISHED,
    TIMER_STATUS_RUNNING
  ]);

  return {
    durationInSeconds: timer.durationInSeconds,
    timerDirection: timer.timerDirection,
    status: TIMER_STATUS_RUNNING
  };
}

function finishTimer(timer) {
  validateTimerStatus(timer.status, TIMER_STATUS_FINISHED, [TIMER_STATUS_FINISHED]);

  return {
    durationInSeconds: timer.durationInSeconds,
    timerDirection: timer.timerDirection,
    status: TIMER_STATUS_FINISHED
  };
}

export { createTimer, pauseTimer, startTimer, finishTimer };
