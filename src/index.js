import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/all.css'
import './css/style.css'
import './css/themify-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/style2.css'
import './css/bootstrap.min.css'
// import './css/w3.css'


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
