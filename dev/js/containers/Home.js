import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-day-picker';
import ClassTable from './ClassTable';

require('../../scss/style.scss');

const Home = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <DatePicker />
                </Col>
                <Col >
                    <ClassTable />
                </Col>
                <Col> </Col>
            </Row>
        </Container>
    );
}

export default Home;