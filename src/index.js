import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore , applyMiddleware, compose} from 'redux'
import {Provider}  from 'react-redux'

import store from './redux/store'
import log from 'loglevel'

import {makeServer} from './server'

log.setLevel("info")

makeServer();

ReactDOM.render(
  <Provider store = {store}>
    <App/>
   </Provider>
  ,document.getElementById('root')
);
