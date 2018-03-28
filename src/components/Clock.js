import React from 'react';

import { connect } from 'react-redux';

import { rules } from '../app/rules';
import { helpers } from '../app/helpers';
import { actions } from '../redux/actions';

const mapStateToProps = (state) => ({
  state: state,
  percentage: helpers.formatPercentage(state),
  colour: rules.isSession(state) ? 'green' : 'red',
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

const togglePaused = (state, dispatch) => {
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
};

const Clock = ({ colour, percentage, state, dispatch }) => {
  return (
    <div className="clock" onClick={togglePaused(state, dispatch)}>
      <div className={`background ${colour}`}></div>
      <div className="cover" style={{height: `${percentage}`}}></div>
      <div className="title">{state.get('name')}</div>
      <div className="timer">{helpers.formatTime(state.get('time'))}</div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
