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
import axios from 'axios'

require('../../scss/style.scss');

class ClassTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: classes,
            hours: hours,
            class_table: this.buildTable()
        };
    }

    componentDidMount() {
        this.fillTable();
    }


    render() {
        this.fillTable(); //fill the table with today's events
        return this.state.class_table; //render class table
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
                        {this.props.classes.map(function (_class) {
                            return <td key={_class.name}>
                                <Container id={_class.name + hour.time}>
                                    <Row id={_class.name + hour.time.substring(0, 2) + "00"} tool-tip=""
                                         style={{height: 5, width: 5, marginRight: 15}}> </Row>
                                    <Row id={_class.name + hour.time.substring(0, 2) + "15"} tool-tip=""
                                         style={{height: 5, width: 5, marginRight: 15}}> </Row>
                                    <Row id={_class.name + hour.time.substring(0, 2) + "30"} tool-tip=""
                                         style={{height: 5, width: 5, marginRight: 15}}> </Row>
                                    <Row id={_class.name + hour.time.substring(0, 2) + "45"} tool-tip=""
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

    //fill class table with all today's events
    fillTable() {
        //set all today's events json
        let data = {};
        //get all today's events
        //token authentication in HTTP header
        const token = '7fd658b7b5dbcadac422fa3386285a45e7748e7a';
        const config = {
            headers: {'Authorization': 'Token ' + token}
        };
        axios.get('http://localhost:8000/api/events/get/',
            // {
            //     params: {
            //         day: this.props.current_day,
            //         month: this.props.current_month
            //     }
            // },
            config)
            .then(response => {
                //console.log('fillTable: ' + response.data)
                data = response.data;
            })
            .catch(error => {
                console.log(error);
            });

        //draw each event in the class table
        for(event in Object.entries(data)){
                let name = event.name,
                    phone = event.phone,
                    date = event.date,
                    _class = event._class,
                    hour = event.hour,
                    hour_to = event.hour_to,
                    description = event.description;
                //calculate how many rows are needed to be painted
                const rowsNumber = this.calcRows(hour, hour_to);
                let time = hour.time; //event start time
                /*paint rows with a random color*/
                //get a random color
                let randomColor = this.getRandomColor();
                //for each row: paint + add tool-tip
                for (let i = 0; i < rowsNumber; i++) {
                    //get row
                    const row_id = _class.name + time;
                    const row = document.getElementById(row_id);
                    //paint raw
                    row.style.backgroundColor = randomColor;
                    //tool-tip with event details
                    row.tooltip = name + '\n' + phone + '\n' + hour + " - " +
                        hour_to + '\n' + description;
                    //add 15 minutes to the time
                    time = this.addQuarter(time);
                }
            }
    }

    //add 15 minutes to the time
    addQuarter(time) {
        let timeInt = parseInt(time.substring(3,5)) + 15;
        if (timeInt === 60)
            return (parseInt(time.substring(0,2)) + 1).toString() + ":00"; //return +1 hour
        return time.substring(0,3) + timeInt.toString(); //return +!5 minutes
    }

    //return how many rows are to be painted
    //each collumn contains 4 rows;
    calcRows(hour, hour_to) {
        //each hour = 4 rows
        const hoursDiff = (parseInt(hour_to.substring(0, 2)) - parseInt(hour.substring(0, 2))) * 4;
        //each 1/4 an hour = 1 row
        const minsDiff = (parseInt(hour.substring(3, 5)) - parseInt(hour_to.substring(3, 5))) / 15;
        return hoursDiff + minsDiff; //add or subtract in accordance to the case
    }

    //return a random color
    getRandomColor() {
        //TODO: not blue-ish colors
        return "#" + ((1 << 24) * Math.random() | 0).toString(16);
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

