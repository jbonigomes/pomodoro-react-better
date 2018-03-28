import { Map } from 'immutable';

export const state = Map({
  time: 25 * 60,
  breakLength: 5,
  sessionLength: 25,

  intervalID: null,

  name: 'Session',
});
