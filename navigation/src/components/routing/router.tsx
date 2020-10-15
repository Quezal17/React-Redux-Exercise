import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {FirstView} from '../views/FirstView';
import {SecondView} from '../views/SecondView';
import {ThirdView} from '../views/ThirdView';

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path='/' component={FirstView}/>
                    <Route exact path='/second' component={SecondView}/>
                    <Route exact path='/third' component={ThirdView}/>
                </div>
            </BrowserRouter>
        );
    }
}



