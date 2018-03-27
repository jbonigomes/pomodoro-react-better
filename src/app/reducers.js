export const pomodoro = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return state.set('name', action.name);

    case 'SET_TIME':
      return state.set('time', action.time);

    case 'SET_INTERVAL_ID':
      return state.set('intervalID', action.intervalID);

    case 'ADD_BREAK_LENGTH':
      return state.set('breakLength', state.get('breakLength') + 1);

    case 'SUBTRACT_BREAK_LENGTH':
      return state.set('breakLength', state.get('breakLength') - 1);

    case 'ADD_SESSION_LENGTH':
      return state.set('sessionLength', state.get('sessionLength') + 1);

    case 'SUBTRACT_SESSION_LENGTH':
      return state.set('sessionLength', state.get('sessionLength') - 1);

    default:
      return state;
  }
};
