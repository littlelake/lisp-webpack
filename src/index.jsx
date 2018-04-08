import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import 'assets/css/style.css';
import 'assets/css/variable.scss';

import Demo from './routes/index';

console.log('hello webpack!');

ReactDOM.render(<Demo />, document.getElementById('app'));
