import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-day-picker';
import ClassTable from './ClassTable';
import RequestList from '../containers/RequestList';
import {store} from '../index';
import {fillTable, refreshTable} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ReactTooltip from 'react-tooltip'

require('../../scss/style.scss');

class Home extends React.Component{
    constructor(props){
        super(props);
        //DatePicker event handlers
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        //GantForm render flag
        store.popUp = false;
        //set state
        this.state = {
            current_day: store.today.substring(5,7),
            current_month: store.today.substring(8,10),
            current_year: store.today.substring(0,5),
        };
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <DatePicker disabledDays={saturday}
                                    onDayClick={this.handleDayClick}
                                    onMonthChange={this.handleMonthChange}
                        />
                        {<RequestList/>}
                    </Col>
                    <Col>
                        <ClassTable/>
                        <ReactTooltip type="warning"/>
                    </Col>
                    <Col> </Col>
                </Row>
            </Container>
        );
    }

    componentDidMount(){
        //this.props.refreshTable();
    }

    handleDayClick(day) {
        if (!saturday(day)) {
            //set current day state
            this.setState({current_day: day});
            store.selectedDate = DateFormat(day);
            this.props.refreshTable();
        }
    }

    handleMonthChange(date) {
        //set month change
        this.setState({current_month: date.getMonth()});
    }
}

function saturday(day) {
    return day.getDay() === 6;
}

/**
 * @return {string}
 */
function DateFormat(day) {
    return new Date(day).toISOString().split("T")[0];
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        //YYYY-MM-DD format of DatePicker's selected date
        date: state.current_year+'-'+state.current_month+'-'+state.current_day,
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
    return bindActionCreators({fillTable, refreshTable}, dispatch);
}

//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(Home);