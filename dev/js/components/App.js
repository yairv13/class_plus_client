import React from 'react';
import Home from '../containers/Home';
import RequestForm from '../containers/RequestForm';
import Nav_bar from './Nav_bar';
import {BrowserRouter, Route} from "react-router-dom"
import {store} from "../index";

require('../../scss/style.scss');

const App = () =>
{
    setStoreValues();
    return (
    <BrowserRouter>
    <div>
        <Nav_bar />
        <Route exact path='/' component={Home}/>
        <Route path='/request' component={RequestForm}/>
    </div>
    </BrowserRouter>
)};


function setStoreValues() {
    store.showList = true; //show RequestList or not
    store.popUp = false; //show Gant form or not
    store.cur_req = {}; //current request to be filled in the gant [from RequestList to GantForm]
    //http authorization headers
    store.token = '7fd658b7b5dbcadac422fa3386285a45e7748e7a';
    store.config = {
        headers: {'Authorization': 'Token ' + store.token}
    };
    store.today = new Date().toISOString().split("T")[0]; //current day
    store.next_year = (parseInt(store.today.substring(0,4))+1).toString() +
        store.today.substring(4,10); //today next year
}

export default App;
