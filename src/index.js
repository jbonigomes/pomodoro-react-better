import './index.css';

import React from 'react';
import thunk from 'redux-thunk';

import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';

import { state } from './app/state';
import { pomodoro } from './app/reducers';

import Pomodoro from './components/Pomodoro';

const store = createStore(pomodoro, state, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Pomodoro />
  </Provider>,
  document.getElementById('pomodoro')
)
