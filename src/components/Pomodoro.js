import React from 'react';

import { handlers } from '../app/handlers';

import Clock from './Clock'
import Controls from './Controls'

const Pomodoro = () => {
  return (
    <div className="pomodoro">
      <div className="controls">
        <Controls
          title="BREAK LENGTH"
          lengthType="breakLength"
          onAdd={handlers.addBreakLength}
          onSubtract={handlers.subtractBreakLength}
        />

        <Controls
          title="SESSION LENGTH"
          lengthType="sessionLength"
          onAdd={handlers.addSessionLength}
          onSubtract={handlers.subtractSessionLength}
        />
      </div>
      <Clock />
    </div>
  );
};

export default Pomodoro;
