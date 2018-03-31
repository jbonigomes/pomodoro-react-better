import './index.css';

import React from 'react';
import thunk from 'redux-thunk';

import { Map } from 'immutable';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { pomodoro } from './redux/reducers';

import Pomodoro from './components/Pomodoro';

const state = Map({
  name: 'Session',

  time: 60,
  breakLength: 1,
  sessionLength: 1,
  intervalID: undefined
});

const store = createStore(pomodoro, state, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Pomodoro />
  </Provider>,
  document.getElementById('pomodoro')
);
