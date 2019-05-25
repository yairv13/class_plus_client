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
        /*this.onClick = this.onClick.bind(this);*/
        //DatePicker event handlers
        Home.handleDayClick = Home.handleDayClick.bind(this);
        Home.handleMonthChange = Home.handleMonthChange.bind(this);
        store.popUp = false;
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <DatePicker disabledDays={saturday}
                                    onDayClick={Home.handleDayClick}
                                    onMonthChange={Home.handleMonthChange}
                        />
                        {store.showList && <RequestList/>}
                        {/*<Button variant="outline-info" onClick={this.onClick}>+</Button>*/}
                    </Col>
                    <Col>
                        <ClassTable/>
                    </Col>
                    <Col> </Col>
                </Row>
            </Container>
        );
    }


    /*onClick(){
        //this.setState({showList: !this.state.showList}, ()=>this.render());
        //store.showList = !store.showList;
        this.forceUpdate();
    }*/

    static handleDayClick(day) {
        if(!saturday(day))
            store.day = day;
    }

    static handleMonthChange(date) {
        //store month change
        store.month = date.getMonth();
    }
}

function saturday(day) {
    return day.getDay() === 6;
}



export default Home;