export const actions = {
  setName: (name) => ({ type: 'SET_NAME', name }),
  setTime: (time) => ({ type: 'SET_TIME', time }),
  setIntervalID: (intervalID) => ({ type: 'SET_INTERVAL_ID', intervalID }),

  addBreakLength: () => ({ type: 'ADD_BREAK_LENGTH' }),
  addSessionLength: () => ({ type: 'ADD_SESSION_LENGTH' }),
  subtractBreakLength: () => ({ type: 'SUBTRACT_BREAK_LENGTH' }),
  subtractSessionLength: () => ({ type: 'SUBTRACT_SESSION_LENGTH' }),
};
