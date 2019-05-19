import React from 'react';
import Home from '../containers/Home';
import RequestForm   from '../containers/RequestForm';
import Nav_bar from './Nav_bar';
import {BrowserRouter, Route} from "react-router-dom"

require('../../scss/style.scss');

const App = () => (
    <BrowserRouter>
    <div>
        <Nav_bar />
        <Route exact path='/' component={Home}/>
        <Route path='/request' component={RequestForm}/>
    </div>
    </BrowserRouter>
);

export default App;
