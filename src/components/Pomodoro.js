import React from 'react';

import Clock from './Clock'
import Controls from './Controls'

const Pomodoro = () => {
  return (
    <div className="pomodoro">
      <div className="controls">
        <Controls type="break" />
        <Controls type="session" />
      </div>
      <Clock />
    </div>
  );
};

export default Pomodoro;
