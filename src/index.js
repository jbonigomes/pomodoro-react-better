import './index.css';

import React from 'react';
import thunk from 'redux-thunk';

import { Map } from 'immutable';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';

import { pomodoro } from './redux/reducers';

import Pomodoro from './components/Pomodoro';

const state = Map({
  time: 25 * 60,
  breakLength: 5,
  sessionLength: 25,

  intervalID: null,

  name: 'Session',
});

const store = createStore(pomodoro, state, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Pomodoro />
  </Provider>,
  document.getElementById('pomodoro')
)
