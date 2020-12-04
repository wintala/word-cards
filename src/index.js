import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import wordReducer from "./reducers/vocab-reducer"
import userReducer from "./reducers/user-reducer"
import navReducer from "./reducers/nav-reducer"
import notificationReducer from "./reducers/notification-reducer"

const reducer = combineReducers({
  words: wordReducer,
  user: userReducer,
  navLoc: navReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
