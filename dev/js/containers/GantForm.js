import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {store} from '../index';
import axios from 'axios';

class GantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: store.cur_req.name,
            phone: store.cur_req.phone,
            date: store.cur_req.date,
            classes: store.cur_req.classes,
            hour_from: store.cur_req.hour,
            hour_to: store.cur_req.hour_to,
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        return (
            <Modal show={store.popUp} onHide={this.handleClose}>
                <Modal.Header closeButton name="close" onClick={this.close}>
                    <Modal.Title>הקצאת כיתה</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <input id="name" name="name" className="form-control" type="text"
                               placeholder="שם מלא" required onChange={this.onChange} value={this.state.name}/>
                        <input id="phone" name="phone" className="form-control" type="tel"
                               pattern="[0]{1}[5]{1}[0-9]{8}|[0]{1}[5]{1}[0-9]{1}-[0-9]{7}"
                               placeholder="טלפון" required onChange={this.onChange} value={this.state.phone}/>
                        <input id="date" name="date" className="form-control" type="date"
                               required onChange={this.onChange} value={this.state.date}/>
                        <select id="classes" name="classes" className="form-control"
                                onChange={this.onChange} value={this.state.classes}>
                            <option defaultValue="כיתה א">כיתה א</option>
                            <option value="כיתה ב">כיתה ב</option>
                            <option value="כיתה ג">כיתה ג</option>
                            <option value="כיתה ד">כיתה ד</option>
                            <option value="כיתה ה">כיתה ה</option>
                            <option value="כיתה ו">כיתה ו</option>
                            <option value="כיתה ז">כיתה ז</option>
                            <option value="כיתה ח">כיתה ח</option>
                            <option value="כיתה ט">כיתה ט</option>
                            <option value="כיתה י">כיתה י</option>
                            <option value="כיתה יא">כיתה יא</option>
                            <option value="כיתה יב">כיתה יב</option>
                        </select>
                        <input id="hour_from" name="hour_from" className="form-control" type="time"
                               required onChange={this.onChange} value={this.state.hour_from}
                               step="900"/>
                        <input id="hour_to" name="hour_to" className="form-control" type="time"
                               required onChange={this.onChange} value={this.state.hour_to} min={this.state.hour_from}
                               step="900"/>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn btn-info" onClick={this.onClick}>שמור</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onClick(){
        /*TODO: check if class is taken then*/
        //fill gant in day&hours
        this.addClass(
            document.getElementById("name").value,
            document.getElementById("phone").value,
            document.getElementById("date").value,
            document.getElementById("classes").value,
            document.getElementById("hour_from").value,
            document.getElementById("hour_to").value,
            document.getElementById("description").value);
        //remove request from request list
        removeItem();
        //close popup gant form
        this.handleClose();
    }

    //unshow Modal
    handleClose() {
        store.popUp = false;
        this.setState({ state: this.state });
    }

    addClass(name, phone, date, _class, hour, hour_to, description) {
        //store event in DB:
        //token authentication in HTTP header
        const token = '7fd658b7b5dbcadac422fa3386285a45e7748e7a';
        const config = {
            headers: {'Authorization': 'Token ' + token}
        };
        axios.post('http://localhost:8000/api/events/add/', {
            params: {
                name:name, phone:phone, date:date, _class:_class,
                hour:hour, hour_to:hour_to, description:description
            }
        }, config)
        //fill table according changes
            .then(response => {
                //TODO: just add 1 event instead refilling the whole table
                console.log('addClass: ' + response.data);
                this.fillTable();
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function removeItem() {
    console.log('delete event');
    //token authentication in HTTP header
    const token = '7fd658b7b5dbcadac422fa3386285a45e7748e7a';
    const config = {
        headers: {'Authorization': 'Token ' + token}
    };
    axios.delete('http://localhost:8000/api/events/all/',
    /*{params: store.cur_req.name},*/ config
    )
        .then(response => {
           console.log(store.cur_req.name + "reqest dealt");
        })
        .catch(error => {
            console.log(error);
        });
}

export default GantForm;
