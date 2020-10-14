import React from 'react';
import ReactDOM from 'react-dom';
import RegrLin from './components/Main.js';
import './translations/i18n';
import { createStore } from 'redux';
import allReducer from './reducers';
import {Provider} from 'react-redux';

const myStore = createStore(
  allReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={myStore}>
        <RegrLin key={0} />
    </Provider>
, document.getElementById('root'));

