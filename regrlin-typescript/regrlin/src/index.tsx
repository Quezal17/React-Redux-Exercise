import React from 'react';
import ReactDOM from 'react-dom';
import RegrLin from './app/components/RegrLin';
import './app/i18next/config/i18n';
import {Provider} from 'react-redux';
import store from './app/redux/store/store';
//import Counter from './components/Counter'

ReactDOM.render(
    <Provider store={store}>
        <RegrLin key={0} />
    </Provider>
, document.getElementById('root'));
