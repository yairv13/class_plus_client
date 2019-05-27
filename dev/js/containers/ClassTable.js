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
import ReactTooltip from 'react-tooltip'

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
                <th />
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
                                    <Row id={1} style={{height: 5, width: 5, marginRight: 15}}
                                         data-tip='custom show and hide'> </Row>
                                    <Row id={2} style={{height: 5, width: 5, marginRight: 15}}
                                         data-tip='custom show and hide'> </Row>
                                    <Row id={3} style={{height: 5, width: 5, marginRight: 15}}
                                         data-tip='custom show and hide'> </Row>
                                    <Row id={4} style={{height: 5, width: 5, marginRight: 15}}
                                         data-tip='custom show and hide'> </Row>
                                </Container>
                            </td>
                        })}
                    </tr>
                )
            )}
            </tbody>
            <ReactTooltip />
        </Table>
    }

    static addClass(cls, hour, hour_to) {
        //stack up the required cells
        const children = [document.getElementById(cls + hour.substring(0, 2) + ":00").children];
        let difference = (hour_to.substring(0, 2) - hour.substring(0, 2)); //diff between hours
        let i = 1;
        while (difference > 0) {
            console.log(parseInt(hour.substring(0, 2)) + i);
            children.push(document.getElementById(cls + (parseInt(hour.substring(0, 2)) + i) + ":00").children);
            difference--;
            i++;
        }
        //colorize & fill the gant
        let randomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
        children.forEach((item) => {
                for(let i=0; i<4; i++)
                {
                    //TODO: fix this shite
                    if (!item[i].style.backgroundRepeat) {
                        item[i].style.backgroundColor = randomColor;
                        item[i].style.backgroundRepeat = true;
                    }
                    else console.log("lol");
                }
            }
        );
        const hr_from = parseInt(hour.substring(3, 5));
        for(let i=0, factor=0; i<4; i++)
        { /*TODO: fix the overriding mechanism*/
            if (hr_from > factor && (children[0].item(i).style.backgroundColor === randomColor))
                children[0].item(i).style.backgroundColor = null;
            factor += 15;
        }
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
