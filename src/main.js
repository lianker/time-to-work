// import { createTimer } from './timers';
// import { ANTICLOCKWISE } from './constants';

// function newTask() {
//   const t = createTimer(3, false);
//   return { description: 'my task', status: 'in progress', timer: t };
// }

function processTimer(currentTime) {
  return `Task running Tempo: ${currentTime}`;
}

// function start(timer) {
//   let time = timer.timerDirection === ANTICLOCKWISE ? timer.durationInSeconds : 0;
//   const endTime = timer.timerDirection === ANTICLOCKWISE ? 0 : timer.durationInSeconds;
//   const listener = setInterval(() => {
//     if (processTimer(endTime, time)) {
//       clearInterval(listener);
//     }

//     if (timer.timerDirection === ANTICLOCKWISE) {
//       time -= 1;
//     } else {
//       time += 1;
//     }
//   }, 1000);
// }

function run(durationInSeconds, isDescrescent, callbackEnd, callbackProgress) {
  let time = isDescrescent ? durationInSeconds : 0;
  const timeToStop = isDescrescent ? 0 : durationInSeconds;

  const listener = setInterval(() => {
    if (callbackProgress && typeof callbackProgress === 'function') callbackProgress(time);

    if (time === timeToStop) {
      callbackEnd();
      clearInterval(listener);
    }

    if (isDescrescent) {
      time -= 1;
    } else {
      time += 1;
    }
  }, 1000);
}

run(3, true, () => 'done', processTimer);
