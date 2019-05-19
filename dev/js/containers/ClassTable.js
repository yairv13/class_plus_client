import React from 'react';
import Table from "react-bootstrap/Table";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {transferClasses} from '../actions/index'
import classes from '../reducers/reducer-classes';
require('../../scss/style.scss');

const ClassTable = () => {
    return (
        <Table responsive striped bordered hover size="sm" bg="white">
            <thead>
            <tr>
                <th> </th>
                <th>כיתה א</th>
                <th>כיתה ב</th>
                <th>כיתה ג</th>
                <th>כיתה ד</th>
                <th>כיתה ה</th>
                <th>כיתה ו</th>
                <th>כיתה ז</th>
                <th>כיתה ח</th>
                <th>כיתה ט</th>
                <th>כיתה י</th>
                <th>כיתה יא</th>
                <th>כיתה יב</th>
                <th>כיתה יג</th>
                <th>כיתה יד</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td> 08:00</td>
            </tr>
            <tr>
                <td> 09:00</td>
            </tr>
            <tr>
                <td> 10:00</td>
            </tr>
            <tr>
                <td> 11:00</td>
            </tr>
            <tr>
                <td> 12:00</td>
            </tr>
            <tr>
                <td> 13:00</td>
            </tr>
            <tr>
                <td> 14:00</td>
            </tr>
            <tr>
                <td> 15:00</td>
            </tr>
            <tr>
                <td> 16:00</td>
            </tr>
            <tr>
                <td> 17:00</td>
            </tr>
            <tr>
                <td> 18:00</td>
            </tr>
            <tr>
                <td> 19:00</td>
            </tr>
            <tr>
                <td> 20:00</td>
            </tr>
            <tr>
                <td> 21:00</td>
            </tr>
            <tr>
                <td> 22:00</td>
            </tr>
            </tbody>
        </Table>
    );
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        classes: state.classes
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({transferClasses: transferClasses}, dispatch);
}

//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(ClassTable);

//export default ClassTable;