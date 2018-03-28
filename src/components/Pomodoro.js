import React from 'react';

import { connect } from 'react-redux';

import { rules } from '../app/rules';
import { helpers } from '../app/helpers';
import { handlers } from '../app/handlers';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

const Pomodoro = ({ state, dispatch }) => {
  return (
    <div className="pomodoro">
      <div className="controls">
        <div>
          <div>BREAK LENGTH</div>
          <span
            className="subtract-break-length"
            onClick={handlers.subtractBreakLength(state, dispatch)}>
            -
          </span>
          <span className="b-len">{state.get('breakLength')}</span>
          <span
            className="add-break-length"
            onClick={handlers.addBreakLength(state, dispatch)}>
            +
          </span>
        </div>

        <div>
          <div>SESSION LENGTH</div>
          <span
            className="subtract-session-length"
            onClick={handlers.subtractSessionLength(state, dispatch)}>
            -
          </span>
          <span className="s-len">{state.get('sessionLength')}</span>
          <span
            className="add-session-length"
            onClick={handlers.addSessionLength(state, dispatch)}>
            +
          </span>
        </div>
      </div>

      <div className="circle" onClick={handlers.togglePaused(state, dispatch)}>
        <div className={`background ${rules.isSession(state) ? 'green' : 'red'}`}></div>
        <div
          className="cover"
          style={{height: `${helpers.formatPercentage(state)}`}}>
        </div>
        <div className="title">{state.get('name')}</div>
        <div className="timer">
          {helpers.formatTime(state.get('time'))}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);
