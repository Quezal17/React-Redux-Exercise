import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {FirstView} from '../views/FirstView';
import {SecondView} from '../views/SecondView';
import {ThirdView} from '../views/ThirdView';
import NavBar from '../NavBar';

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavBar/>
                    <Route exact path='/' component={FirstView}/>
                    <Route  path='/second' component={SecondView}/>
                    <Route  path='/third' component={ThirdView}/>
                </div>
            </BrowserRouter>
        );
    }
}



