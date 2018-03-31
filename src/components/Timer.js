import React from 'react';

import { connect } from 'react-redux';

const formatTime = time => {
  const h = Math.floor(+time / 3600);
  const m = Math.floor((+time % 3600) / 60);
  const s = Math.floor((+time % 3600) % 60);

  return (
    (h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') +
    m +
    ':' +
    (s < 10 ? '0' : '') +
    s
  );
};

const mapStateToProps = state => ({
  clockTime: formatTime(state.get('time'))
});

const Timer = ({ clockTime }) => {
  return <div className="timer">{clockTime}</div>;
};

export default connect(mapStateToProps)(Timer);
