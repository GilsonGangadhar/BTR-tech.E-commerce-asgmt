import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store/store'
import {Provider} from 'react-redux'

const store = configureStore();
// console.log(store.getState())

// store.subscribe(() => {
//   console.log(store.getState())
// })

const ele = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(ele, document.getElementById('root'));


