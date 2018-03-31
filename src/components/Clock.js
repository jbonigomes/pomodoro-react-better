import React from 'react';

import { connect } from 'react-redux';

import { rules } from '../app/rules';
import { actions } from '../redux/actions';

import Timer from './Timer';
import Background from './Background';

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

const playSound = () => {
  const addPause = len =>
    Array(len)
      .fill('A')
      .join('');
  const str = `//uQQQ${addPause(21)}//uQ/QuQQQ${addPause(519)}//uQQQ`;

  new Audio(`data:audio/wav;base64,${str}`).play();
};

const tickClock = dispatch => {
  return () => {
    dispatch((dispatch, getState) => {
      if (rules.canSubtractTime(getState())) {
        dispatch(actions.setTime(getState().get('time') - 1));
      } else {
        playSound();

        if (rules.isSession(getState())) {
          dispatch(actions.setName('Break!'));
          dispatch(actions.setTime(getState().get('breakLength') * 60));
        } else {
          dispatch(actions.setName('Session'));
          dispatch(actions.setTime(getState().get('sessionLength') * 60));
        }
      }
    });
  };
};

const togglePaused = (state, dispatch) => {
  return () => {
    if (rules.isPaused(state)) {
      dispatch(actions.setIntervalID(setInterval(tickClock(dispatch), 100)));
    } else {
      dispatch(actions.setIntervalID(clearInterval(state.get('intervalID'))));
    }
  };
};

const Clock = ({ state, dispatch }) => {
  return (
    <div className="clock" onClick={togglePaused(state, dispatch)}>
      <Background />
      <div className="title">{state.get('name')}</div>
      <Timer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
