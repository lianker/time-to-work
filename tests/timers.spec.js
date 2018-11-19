import { expect } from 'chai';

import { createTimer, pauseTimer, startTimer, finishTimer } from '../src/timers';
import {
  CLOCKWISE,
  ANTICLOCKWISE,
  TIMER_STATUS_STOPED,
  TIMER_STATUS_PAUSED,
  TIMER_STATUS_FINISHED,
  TIMER_STATUS_RUNNING
} from '../src/constants';

describe('timers', () => {
  describe('#createTimer()', () => {
    context('without parameters', () => {
      it('should be returns a timer with duration in seconds equal 25', () => {
        let timer = createTimer();
        expect(timer.durationInSeconds).to.equal(25);
      });

      it('should be returns a timer with timer direction equal "CLOCKWISE"', () => {
        let timer = createTimer();
        expect(timer.timerDirection).to.equal(CLOCKWISE);
      });

      it('should be returns a timer with status "STOPED"', () => {
        let timer = createTimer();
        expect(timer.status).to.equal(TIMER_STATUS_STOPED);
      });
    });

    context('with parameters', () => {
      it('should be returns a timer with duration in seconds equal param seconds', () => {
        let seconds = 10;
        let timer = createTimer(seconds);
        expect(timer.durationInSeconds).to.equal(seconds);
      });

      it('should be returns a timer with direction equal "ANTICLOCKWISE" if isDecreasing param be true', () => {
        let seconds = 10;
        let timer = createTimer(seconds, true);
        expect(timer.timerDirection).to.equal(ANTICLOCKWISE);
      });
    });
  });

  describe('#pauseTimer()', () => {
    context('Timer is stoped', () => {
      it('should raise error "timer can\'t be updated to paused, because it is stoped"', () => {
        let timer = createTimer();
        expect(() => {
          pauseTimer(timer);
        }).to.throw(TypeError, "timer can't be updated to paused, because it is stoped");
      });
    });

    context('Timer is finished', () => {
      it('should raise error "timer can\'t be paused, because it is finished"', () => {
        let timer = createTimer(25, false, TIMER_STATUS_FINISHED);
        expect(() => {
          pauseTimer(timer);
        }).to.throw(TypeError, "timer can't be updated to paused, because it is finished");
      });
    });

    context('Timer is paused', () => {
      it('should raise error "timer can\'t be updated to paused, because it is already paused"', () => {
        let timer = createTimer(25, false, TIMER_STATUS_PAUSED);
        expect(() => {
          pauseTimer(timer);
        }).to.throw(TypeError, "timer can't be updated to paused, because it is already paused");
      });
    });

    context('Timer is running (happy path =)', () => {
      it('should returns a timer with status paused', () => {
        let timer = createTimer(25, false, TIMER_STATUS_RUNNING);
        expect(timer.status).to.equal(TIMER_STATUS_RUNNING);

        let pausedTimer = pauseTimer(timer);
        expect(pausedTimer.status).to.equal(TIMER_STATUS_PAUSED);
      });
    });
  });

  describe('#startTimer()', () => {
    context('Timer is running', () => {
      it('should raise error "timer can\'t be updated to running, because it is already running"', () => {
        let timer = createTimer(25, false, TIMER_STATUS_RUNNING);
        expect(() => {
          startTimer(timer);
        }).to.throw(TypeError, "timer can't be updated to running, because it is already running");
      });
    });
    context('Timer is finished', () => {
      it('should raise error "timer can\'t be updated to finished, because it is already finished"', () => {
        let timer = createTimer(25, false, TIMER_STATUS_FINISHED);
        expect(() => {
          startTimer(timer);
        }).to.throw(TypeError, "timer can't be updated to running, because it is finished");
      });
    });
    context('Timer is stoped or paused (happy path =)', () => {
      it('should returns a timer with status running', () => {
        let timerStoped = createTimer(25, false, TIMER_STATUS_STOPED);
        let timerPaused = createTimer(25, false, TIMER_STATUS_PAUSED);

        let runningTimer01 = startTimer(timerStoped);
        expect(runningTimer01.status).to.equal(TIMER_STATUS_RUNNING);

        let runningTimer02 = startTimer(timerPaused);
        expect(runningTimer02.status).to.equal(TIMER_STATUS_RUNNING);
      });
    });
  });

  describe('#finishTimer()', () => {
    context('Timer is finished', () => {
      it('should raise error "timer can\'t be updated to finished, because it is already finished"', () => {
        let timer = createTimer(25, false, TIMER_STATUS_FINISHED);
        expect(() => {
          finishTimer(timer);
        }).to.throw(
          TypeError,
          "timer can't be updated to finished, because it is already finished"
        );
      });
    });
  });
});
