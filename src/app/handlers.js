import { rules } from './rules';
import { actions } from './actions';
import { helpers } from './helpers';

export const handlers = {
  addSessionLength (state, dispatch) {
    return () => {
      if (rules.canAddSessionLength(state)) {
        dispatch(actions.addSessionLength());

        dispatch((dispatch, getState) => {
          if (rules.isSession(getState())) {
            dispatch(actions.setTime(getState().get('sessionLength') * 60));
          }
        });
      }
    };
  },

  subtractSessionLength (state, dispatch) {
    return () => {
      if (rules.canSubtractSessionLength(state)) {
        dispatch(actions.subtractSessionLength());

        dispatch((dispatch, getState) => {
          if (rules.isSession(getState())) {
            dispatch(actions.setTime(getState().get('sessionLength') * 60));
          }
        });
      }
    };
  },

  addBreakLength (state, dispatch) {
    return () => {
      if (rules.canAddBreakLength(state)) {
        dispatch(actions.addBreakLength());

        dispatch((dispatch, getState) => {
          if (!rules.isSession(getState())) {
            dispatch(actions.setTime(getState().get('breakLength') * 60));
          }
        });
      }
    };
  },

  subtractBreakLength (state, dispatch) {
    return () => {
      if (rules.canSubtractBreakLength(state)) {
        dispatch(actions.subtractBreakLength());

        dispatch((dispatch, getState) => {
          if (!rules.isSession(getState())) {
            dispatch(actions.setTime(getState().get('breakLength') * 60));
          }
        });
      }
    };
  },

  togglePaused (state, dispatch) {
    return () => {
      if (!rules.isPaused(state)) {
        clearInterval(state.get('intervalID'));
        dispatch(actions.setIntervalID(null));
      }
      else {
        const intervalID = setInterval(() => {
          dispatch((dispatch, getState) => {
            if (rules.canSubtractTime(getState())) {
              dispatch(actions.setTime(getState().get('time') - 1));
            }
            else {
              helpers.playSound();

              if (rules.isSession(getState())) {
                dispatch(actions.setName('Break!'));
                dispatch(actions.setTime(getState().get('breakLength') * 60));
              }
              else {
                dispatch(actions.setName('Session'));
                dispatch(actions.setTime(getState().get('sessionLength') * 60));
              }
            }
          });
        }, 1000);

        dispatch(actions.setIntervalID(intervalID));
      }
    };
  },
};
