import React from 'react';
import ReactDOM from 'react-dom';
import RegrLin from './components/Main';
import './translations/i18n';
import {Provider} from 'react-redux';
import store from './store/store';
//import Counter from './components/Counter'

ReactDOM.render(
    <Provider store={store}>
        <RegrLin key={0} />
    </Provider>
, document.getElementById('root'));
