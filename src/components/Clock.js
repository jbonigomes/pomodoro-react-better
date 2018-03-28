import React from 'react';

import { connect } from 'react-redux';

import { rules } from '../app/rules';
import { helpers } from '../app/helpers';
import { handlers } from '../app/handlers';

const mapStateToProps = (state) => ({
  state: state,
  percentage: helpers.formatPercentage(state),
  colour: rules.isSession(state) ? 'green' : 'red',
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

const Clock = ({ colour, percentage, state, dispatch }) => {
  return (
    <div className="clock" onClick={handlers.togglePaused(state, dispatch)}>
      <div className={`background ${colour}`}></div>
      <div className="cover" style={{height: `${percentage}`}}></div>
      <div className="title">{state.get('name')}</div>
      <div className="timer">{helpers.formatTime(state.get('time'))}</div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
