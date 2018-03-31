import React from 'react';

import { connect } from 'react-redux';

import { rules } from '../app/rules';

const formatPercentage = state => {
  const time = state.get('time');
  const isSession = rules.isSession(state);
  const length = isSession
    ? state.get('sessionLength')
    : state.get('breakLength');

  return `${100 - Math.floor(time * 100 / (length * 60))}%`;
};

const mapStateToProps = state => ({
  percentage: formatPercentage(state),
  colour: rules.isSession(state) ? 'green' : 'red'
});

const Background = ({ colour, percentage }) => {
  return (
    <div
      style={{ height: `${percentage}` }}
      className={`background ${colour}`}
    />
  );
};

export default connect(mapStateToProps)(Background);
