import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import classReducer from './store/reducers/classSection-reducer'
import toDoReducer from './store/reducers/toDo-reducer'

import './index.css';
import './css/all.css'
import './css/style.css'
import './css/themify-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/style2.css'
import './css/bootstrap.min.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({

    "classReducer": classReducer,
    "toDoReducer": toDoReducer
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
