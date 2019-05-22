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
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <DatePicker/>
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

    onClick(){
        //this.setState({showList: !this.state.showList}, ()=>this.render());
        //store.showList = !store.showList;
        this.forceUpdate();
    }
}

export default Home;