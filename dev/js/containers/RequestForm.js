import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {submitRequest} from '../actions/index'
import {store} from '../index';

/*The request form for classes*/

/*Made for external users; the form is to be sent to the Classes Officer*/
class RequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //current form data
            name: "שם כלשהו",
            phone: "0549254485",
            date: store.today,
            participants: "small",
            hour: "09:00",
            hour_to: "09:45",
            description: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {/*1 of three columns*/}
                    <div className="col-md">
                    </div>
                    {/*2 of three columns*/}
                    <div className="col-md text-center">

                        <h1>טופס בקשת כיתה</h1>
                        <h2>קמפוס בסמ"ח</h2>
                        <form id="request_form" name="request_form" action="http://localhost:3000" method="get">
                            <label>שם מלא</label>
                            <input id="name" name="name" className="form-control" type="text" placeholder="שדה חובה"
                                   required
                                   onChange={this.onChange} value={this.state.name} maxLength='20'/>
                            <label>טלפון</label>
                            <input id="phone" name="phone" className="form-control" type="tel"
                                   pattern="[0]{1}[5]{1}[0-9]{8}|[0]{1}[5]{1}[0-9]{1}-[0-9]{7}"
                                   placeholder="שדה חובה" required onChange={this.onChange} value={this.state.phone}
                                   minLength='10' maxLength='20'/>
                            <label>תאריך</label>
                            <input id="date" name="date" className="form-control" type="date" max={store.next_year}
                                   min={store.today}
                                   placeholder="שדה חובה" required onChange={this.onChange} value={this.state.date}/>

                            <label>כמות משתתפים</label>
                            <select id="participants" name="participants" className="form-control"
                                    onChange={this.onChange} value={this.state.participants}>
                                <option defaultValue="small">עד 20</option>
                                <option value="medium">20-40</option>
                                <option value="big">40+</option>
                            </select>
                            <label>שעת התחלה</label>
                            <input id="hour" name="hour" className="form-control" type="time" placeholder="שדה חובה"
                                   min='09:00' max='21:45' step="900" required onChange={this.onChange}
                                   value={this.state.hour}/>
                            <label>שעת סיום</label>
                            <input id="hour_to" name="hour_to" className="form-control" type="time"
                                   placeholder="שדה חובה" required
                                   min={this.state.hour} max='22:00' step="900" onChange={this.onChange}
                                   value={this.state.hour_to}/>
                            <label>נושא השיעור</label>
                            <input id="description" name="description" className="form-control" type="textarea"
                                   onChange={this.onChange} value={this.state.description} maxLength="40"/>
                            <button name="button" type="submit" className="btn btn-dark"
                                    onClick={this.onSubmit}>
                                שלח
                            </button>
                        </form>
                    </div>
                    {/*3 of three columns*/}
                    <div className="col-md">
                    </div>
                </div>
            </div>
        )
    }

    onSubmit() {
        //don't send if the form is invalid
        if (!this.formIsValid(this.state.phone, this.state.hour, this.state.hour_to, this.state.date))
            return;
        //else - send if valid
        const class_request = {
            name: this.state.name,
            phone: this.state.phone,
            date: this.state.date,
            participants: this.state.participants,
            hour: this.state.hour,
            hour_to: this.state.hour_to,
            description: this.state.description,
        };
        return this.props.submitRequest(class_request);
    }

    onChange(e) {
        //update field state ifValid
        if (this.fieldIsValid(e.target))
            this.setState({
                [e.target.name]: e.target.value
            });
    }

    //validate form fields during its completion
    fieldIsValid(target) {
        const value = target.value;
        switch (target.type) {
            case 'tel':
                return (value[0] === "0" && value.length < 20);
            case 'time':
                return ("09:00" <= value && value <= "22:00" && value.substring(3,5)%15===0);
            case 'date':
                return (store.next_year >= value && value >= store.today);
        }
        return true;
    }

    //final validation of form before its submitting
    formIsValid(phone, hour, hour_to, date) {
        console.log(hour.substring(3,5)%15);
        //validate phone
        if (phone[0] !== "0" || phone.length > 20 || phone.length < 9)
            return false;
        // //validate begining hour
        if("09:00" > hour || hour > "22:00" || hour > hour_to-15 || hour.substring(3,5)%15!==0)
            return false;
        // //validate finishing hour
        if("09:00" > hour_to || hour_to > "22:00" || hour_to < hour+15 || hour.substring(3,5)%15!==0)
            return false;
        // //validate date
        if(store.next_year < date || date < store.today)
            return false;
        //return true if form is valid
        return true;
    }
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {};
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
    return bindActionCreators({submitRequest: submitRequest}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(RequestForm);

