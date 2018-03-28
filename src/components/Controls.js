import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

const Controls = ({ title, onSubtract, onAdd, lengthType, state, dispatch }) => {
  return (
    <div>
      <div>{title}</div>
      <i onClick={onSubtract(state, dispatch)}>-</i>
      <span>{state.get(lengthType)}</span>
      <i onClick={onAdd(state, dispatch)}>+</i>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
