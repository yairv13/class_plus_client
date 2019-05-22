import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {store} from '../index';
import RequestList from '../containers/RequestList';

class GantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: store.cur_req.name,
            phone: store.cur_req.phone,
            date: store.cur_req.date,
            classes: store.cur_req.classes,
            hour_from: store.cur_req.hour,
            hour_to: calcHourTo(),
            show: true
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
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
                            <option defaultValue="class_alef">כיתה א</option>
                            <option value="class_bet">כיתה ב</option>
                            <option value="class_gimmel">כיתה ג</option>
                            <option value="class_dalet">כיתה ד</option>
                            <option value="class_hey">כיתה ה</option>
                            <option value="class_vav">כיתה ו</option>
                            <option value="class_zain">כיתה ז</option>
                            <option value="class_het">כיתה ח</option>
                            <option value="class_tet">כיתה ט</option>
                            <option value="class_yud">כיתה י</option>
                            <option value="class_yud_alef">כיתה יא</option>
                            <option value="class_yud_bet">כיתה יב</option>
                        </select>
                        <input id="hour_from" name="hour_from" className="form-control" type="time"
                               required onChange={this.onChange} value={this.state.hour_from} max={this.state.hour_to}/>
                        <input id="hour_to" name="hour_to" className="form-control" type="time"
                               required onChange={this.onChange} value={this.state.hour_to} min={this.state.hour_from}/>
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

    }

    handleClose() {
        store.popUp = !store.popUp;
        store.showList = true;
        this.setState({ show: false });
    }

}

const calcHourTo = () => {
    const hour_send = store.cur_req.hour;
    let hours = parseInt(hour_send.substring(0,2));
    let minutes = parseInt(hour_send.substring(3,5));
    minutes += parseInt(store.cur_req.length);
    while (minutes >= 60)
    {
        hours++;
        minutes-=60;
    }
    return hours.toString()+':'+minutes.toString();
}

export default GantForm;
