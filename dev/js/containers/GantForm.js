import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {store} from '../index';
import axios from 'axios';
import fillTable from 'ClassTable';

class GantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: store.cur_req.name,
            phone: store.cur_req.phone,
            date: store.cur_req.date,
            classes: "כיתה א", //default value - cls_id = 1
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

    onClick() {
        //if place isn't taken - fill gant with day&hours
        if (this.addClass(
            this.state.name,
            this.state.phone,
            this.state.date,
            this.state.classes,
            this.state.hour_from,
            this.state.hour_to,
            store.cur_req.description
        ) === false)
        //prevent request removal from RequestList on the corner
        //don't close the GantForm
            return;
        //remove request from request list
        this.removeItem();
        //close popup gant form
        this.handleClose();
    }

    //unshow Modal
    handleClose() {
        store.popUp = false; //flag to not render GantForm
        this.setState({state: this.state}); //refresh and unrender component
    }

    addClass(name, phone, date, _class, hour, hour_to, description) {
        //store event in DB:
        const cls_id = this.getClassID(_class); //convert class name to its cls_id
        axios.post('http://localhost:8000/api/assigned_events/', {
            name: name, phone: phone, date: date, cls_id: cls_id,
            hour: hour, hour_to: hour_to, description: description
        }, store.config)
        //if place is already taken
            .catch(error => {
                alert("רשומה תפוסה, אנא נסו שנית.");
                return false;
            })
            //else - fill table according changes
            .then(response => {
                fillTable();
            });
    }


//return cls_id by its name
    getClassID(_class) {
        switch (_class) {
            case "כיתה א":
                return 1;
            case "כיתה ב":
                return 2;
            case "כיתה ג":
                return 3;
            case "כיתה ד":
                return 4;
            case "כיתה ה":
                return 5;
            case "כיתה ו":
                return 6;
            case "כיתה ז":
                return 7;
            case "כיתה ח":
                return 8;
            case "כיתה ט":
                return 9;
            case "כיתה י":
                return 10;
            case "כיתה יא":
                return 11;
            case "כיתה יב":
                return 12;
            case "כיתה יג":
                return 13;
            case "כיתה יד":
                return 14;
            default:
                return 1;
        }
    }

    removeItem() {
        //delete request from cornered RequestList
        axios.delete('http://localhost:8000/api/unassigned_events/' +
            store.cur_req.date + '/' + store.cur_req.cls_id + '/',
            store.config)
            .then(response => {
                console.log(store.cur_req.name + "request dealt");
            })
            .catch(error => {
                console.log(error);
            });
    }

}

export default GantForm;
