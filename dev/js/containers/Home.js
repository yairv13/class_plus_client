import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-day-picker';
import ClassTable from './ClassTable';
import RequestList from '../containers/RequestList';
import Button from "react-bootstrap/Button";

require('../../scss/style.scss');

class Home extends React.Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <DatePicker/>
                        <RequestList/>
                        <Button variant="outline-info" onClick={this.onClick}>+</Button>
                    </Col>
                    <Col>
                        <ClassTable/>
                    </Col>
                    <Col> </Col>
                </Row>
            </Container>
        );
    }

    onClick(){

    }
}

export default Home;