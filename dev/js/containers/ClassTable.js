import React from 'react';
import Table from "react-bootstrap/Table";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {transferClasses, transferHours} from '../actions/index';
import classes from '../reducers/reducer-classes';
import hours from '../reducers/reducer-hours';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ReactTooltip from 'react-tooltip'
import {fillTable, getClassID} from "../actions/index";
import {store} from '../index'
import {refreshTable} from "../actions";
require('../../scss/style.scss');

class ClassTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: classes, //Basmach classes
            hours: hours, //daily study hours
            class_table: this.buildTable(), //the table of assigned class events
        };
    }

    render() {
        return this.state.class_table; //render class table
    }

    componentDidMount() {
        refreshTable();
    }

    buildTable() {
        return (
            <Table responsive striped bordered hover size="sm">
                <thead>
                <tr>
                    <th/>
                    {this.props.classes.map((cls) =>
                        <th key={cls.name}> {cls.name}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {this.props.hours.map((hour) => (
                    <tr key={hour.time}>
                        <td>{hour.time}</td>
                        {this.props.classes.map(function (_class, index) {
                            const _id = getClassID(_class.name).payload;
                            return <td key={index}>
                                <Container id={_id} data-tip="">
                                    <Row id={_id + hour.time.substring(0, 3) + "00"} data-tip=""
                                         style={{height: 5, width: 5, marginRight: 15}}> </Row>
                                    <Row id={_id + hour.time.substring(0, 3) + "15"} data-tip=""
                                         style={{height: 5, width: 5, marginRight: 15}}> </Row>
                                    <Row id={_id + hour.time.substring(0, 3) + "30"} data-tip=""
                                         style={{height: 5, width: 5, marginRight: 15}}> </Row>
                                    <Row id={_id + hour.time.substring(0, 3) + "45"} data-tip=""
                                         style={{height: 5, width: 5, marginRight: 15}}> </Row>
                                </Container>
                            </td>
                        })}
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    }
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        classes: state.classes,
        hours: state.hours
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
    return bindActionCreators({transferClasses: transferClasses, transferHours: transferHours,
    refreshTable: refreshTable, fillTable:fillTable, getClassID: getClassID}, dispatch);
}

//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(ClassTable);

