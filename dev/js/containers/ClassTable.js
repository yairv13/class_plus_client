import React from 'react';
import Table from "react-bootstrap/Table";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {transferClasses} from '../actions/index'
import {transferHours} from '../actions/index'
import classes from '../reducers/reducer-classes';
import hours from '../reducers/reducer-hours';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
require('../../scss/style.scss');

class ClassTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {classes: classes, hours: hours};
    }

    render() {
        return <Table responsive striped bordered hover size="sm">
            <thead>
            <tr>
                <th> </th>
                {this.props.classes.map((cls) =>
                     <th key={cls.name}> {cls.name}</th>
                )}
            </tr>
            </thead>
            <tbody>
            {this.props.hours.map((hour) =>
                 (
                    <tr key={hour.time}>
                        <td>{hour.time}</td>
                        {this.props.classes.map(function (cls) {
                            return <td key={cls.name}>
                                <Container id={cls.name + hour.time}>
                                    <Row id={1} style={{height:5, width:5, marginRight:15}}> </Row>
                                    <Row id={2} style={{height:5, width:5, marginRight:15}}> </Row>
                                    <Row id={3} style={{height:5, width:5, marginRight:15}}> </Row>
                                    <Row id={4} style={{height:5, width:5, marginRight:15}}> </Row>
                                </Container>
                            </td>
                        })}
                    </tr>
                )
            )}
            </tbody>
        </Table>
    }

    /*style={{backgroundColor: "#ff0000", height:5, width:5, marginRight:15}}*/

    static addClass(cls, hour, hour_to){
        //minutes of
        //paint the cells
        const children = [document.getElementById(cls + hour.substring(0,2)+":00").children];
        let difference = (hour_to.substring(0,2) > hour.substring(0,2)); //diff between hours
        let i=1;
        while (difference > 0)
        {
            children.push (document.getElementById(cls + (parseInt(hour.substring(0,2)) + i) +":00").children)
            difference--;
            i++;
        }
        children.forEach((item, index) =>
            item[index].style.backgroundColor = "#ff0000"
        )
        //children.style.backgroundColor = "#ff0000";

        //store.yearly_class_table[store.month[store.day[cls_request.hour_from, cls_request.hour_to]]]
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
            return bindActionCreators({transferClasses: transferClasses, transferHours: transferHours}, dispatch);
        }

//      > UserList is now aware of state and actions
        export default connect(mapStateToProps, matchDispatchToProps)(ClassTable);

//export default ClassTable;
