import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {store} from '../index';
import axios from 'axios';
import {fillTable, getClassID} from "../actions/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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
        //and remove item from RequestList
        if (!this.addClass(
            this.state.name,
            this.state.phone,
            this.state.date,
            this.state.classes,
            this.state.hour_from,
            this.state.hour_to,
            store.cur_req.description
        ))
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

    //add the class to DB and return true - if there's space for it
    //else - return false
    addClass(name, phone, date, _class, hour, hour_to, description) {
        //store event in DB:
        const cls_id = this.props.getClassID(_class).payload; //convert class name to its cls_id
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
                this.props.fillTable(store.selectedDate);
                return true;
            });
    }

    removeItem() {
        //delete request from cornered RequestList
        axios.delete('http://localhost:8000/api/unassigned_events/' +
            store.cur_req.date + '/' + store.cur_req.cls_id + '/',
            store.config)
            .then(response => {})
            .catch(error => {
                console.log(error);
            });
    }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        name: state.name,
        phone: state.phone,
        date: state.date,
        classes: state.classes,
        hour_from: state.hour_from,
        hour_to: state.hour_to
};
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
    return bindActionCreators({fillTable: fillTable, getClassID: getClassID}, dispatch);
}

//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(GantForm);
