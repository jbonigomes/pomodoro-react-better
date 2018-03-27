import { rules } from './rules';
import { actions } from './actions';
import { helpers } from './helpers';

export const handlers = {
  addSessionLength (store) {
    return () => {
      if (rules.canAddSessionLength(store.getState())) {
        store.dispatch(actions.addSessionLength());

        if (rules.isSession(store.getState())) {
          store.dispatch(actions.setTime(store.getState().get('sessionLength') * 60));
        }
      }
    };
  },

  subtractSessionLength (store) {
    return () => {
      if (rules.canSubtractSessionLength(store.getState())) {
        store.dispatch(actions.subtractSessionLength());

        if (rules.isSession(store.getState())) {
          store.dispatch(actions.setTime(store.getState().get('sessionLength') * 60));
        }
      }
    };
  },

  addBreakLength (store) {
    return () => {
      if (rules.canAddBreakLength(store.getState())) {
        store.dispatch(actions.addBreakLength());

        if (!rules.isSession(store.getState())) {
          store.dispatch(actions.setTime(store.getState().get('breakLength') * 60));
        }
      }
    };
  },

  subtractBreakLength (store) {
    return () => {
      if (rules.canSubtractBreakLength(store.getState())) {
        store.dispatch(actions.subtractBreakLength());

        if (!rules.isSession(store.getState())) {
          store.dispatch(actions.setTime(store.getState().get('breakLength') * 60));
        }
      }
    };
  },

  togglePaused (store) {
    return () => {
      if (!rules.isPaused(store.getState())) {
        clearInterval(store.getState().get('intervalID'));
        store.dispatch(actions.setIntervalID(null));
      }
      else {
        const intervalID = setInterval(() => {
          if (rules.canSubtractTime(store.getState())) {
            store.dispatch(actions.setTime(store.getState().get('time') - 1));
          }
          else {
            helpers.playSound();

            if (rules.isSession(store.getState())) {
              store.dispatch(actions.setName('Break!'));
              store.dispatch(actions.setTime(store.getState().get('breakLength') * 60));
            }
            else {
              store.dispatch(actions.setName('Session'));
              store.dispatch(actions.setTime(store.getState().get('sessionLength') * 60));
            }
          }
        }, 1000);

        store.dispatch(actions.setIntervalID(intervalID));
      }
    };
  },
};
