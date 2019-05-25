import React from 'react';
import Home from '../containers/Home';
import RequestForm from '../containers/RequestForm';
import Nav_bar from './Nav_bar';
import {BrowserRouter, Route} from "react-router-dom"
import {store} from "../index";
import ClassTable from '../containers/ClassTable';
import classes from '../reducers/reducer-classes';
import hours from '../reducers/reducer-hours';

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
    store.class_requests = []; //initial setting the store requests
    store.showList = true;
    store.popUp = false;
    store.cur_req = {}; //current request to be filled in the gant [from RequestList to GantForm]
    //class table, according to hours & classes reducers
    const cols = 14, rows = 15;
    const arr = [31, [cols, rows]];
    //Class Table multiple values by month
    store.yearly_class_table = [
        /*jan*/ arr.slice(),
        /*feb*/ arr.slice(),
        /*mar*/ arr.slice(),
        /*apr*/ arr.slice(),
        /*may*/ arr.slice(),
        /*jun*/ arr.slice(),
        /*jul*/ arr.slice(),
        /*aug*/ arr.slice(),
        /*sep*/ arr.slice(),
        /*oct*/ arr.slice(),
        /*nov*/ arr.slice(),
        /*dec*/ arr.slice()
    ];
    //months
    store.months =
        {jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11};
    //current month
    store.month = new Date().getMonth(); //jan = 0
    store.month = new Date().getDay(); //1
    createTables();
}

function createTables() {
    //store.tables = [12, ]
}

export default App;
