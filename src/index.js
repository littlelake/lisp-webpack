import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import 'assets/css/style.css';
import 'assets/css/public.scss';

import Demo from './routes/index';

console.log('hello webpack!');

var render = () => {
  ReactDOM.render(<Demo />, document.getElementById('app'));
}

render();

if(module.hot) {
  module.hot.accept('/', () => {
    render();
  })
}