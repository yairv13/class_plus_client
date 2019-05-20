import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-day-picker';
import ClassTable from './ClassTable';
import Button from "react-bootstrap/Button";

require('../../scss/style.scss');

class Home extends React.Component{
    constructor(props, context){
        super(props, context);
        //this.state = {name: "", phone: "", date: "", participants:"none", length: "", hour:"", notes:""};
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <DatePicker/>
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