import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-day-picker';
import ClassTable from './ClassTable';
import RequestList from '../containers/RequestList';
import {store} from '../index';

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
            current_month: store.today.substring(8,10)
        }
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
                        {store.showList && <RequestList/>}
                    </Col>
                    <Col>
                        <ClassTable/>
                    </Col>
                    <Col> </Col>
                </Row>
            </Container>
        );
    }

    handleDayClick(day) {
        if(!saturday(day)) {
            //set current day state
            this.setState({current_day: day});
            //refill table
            ClassTable.fillTable();
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

export default Home;