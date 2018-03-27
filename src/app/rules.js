export const rules = {
  isPaused: (state) => !state.get('intervalID'),
  isSession: (state) => state.get('name') === 'Session',

  canSubtractTime: (state) => state.get('time') > 0,

  canAddBreakLength: (state) => !state.get('intervalID') && state.get('breakLength') < 120,
  canSubtractBreakLength: (state) => !state.get('intervalID') && state.get('breakLength') > 1,

  canAddSessionLength: (state) => !state.get('intervalID') && state.get('sessionLength') < 120,
  canSubtractSessionLength: (state) => !state.get('intervalID') && state.get('sessionLength') > 1,
};
