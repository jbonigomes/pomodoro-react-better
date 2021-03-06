import React from 'react';

import { connect } from 'react-redux';

import { rules } from '../app/rules';
import { actions } from '../redux/actions';

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const modifyLength = (operation, type, state, dispatch) => {
  const upperType = capitalize(type);
  const upperOperation = capitalize(operation);

  return () => {
    if (rules[`can${upperOperation}${upperType}Length`](state)) {
      dispatch(actions[`${operation}${upperType}Length`]());

      dispatch((dispatch, getState) => {
        if (rules[`is${upperType}`](getState())) {
          dispatch(actions.setTime(getState().get(`${type}Length`) * 60));
        }
      });
    }
  };
};

const Controls = ({ type, state, dispatch }) => {
  return (
    <div>
      <div>{type} length</div>
      <i onClick={modifyLength('subtract', type, state, dispatch)}>-</i>
      <span>{state.get(`${type}Length`)}</span>
      <i onClick={modifyLength('add', type, state, dispatch)}>+</i>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
