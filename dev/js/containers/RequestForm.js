import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {submitRequest} from '../actions/index'

/*The request form for classes*/
/*Made for external users; the form is to be sent to the Classes Officer*/
class RequestForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //current form data
            name: "שם כלשהו",
            phone: "0549254485",
            date: "2019-12-03",
            participants: "small",
            length: "45",
            hour: "13:00",
            description: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    {/*1 of three columns*/}
                    <div className="col-md">
                    </div>
                    {/*2 of three columns*/}
                    <div className="col-md text-center">

                        <h1>טופס בקשת כיתה</h1>
                        <h2>קמפוס בסמ"ח</h2>
                        <form name="request_form">
                            <label>שם מלא</label>
                            <input id="name" name="name" className="form-control" type="text" placeholder="שדה חובה" required
                                   onChange={this.onChange} value={this.state.name} maxLength='20'/>
                            <label>טלפון</label>
                            <input id="phone" name="phone" className="form-control" type="tel" pattern="[0]{1}[5]{1}[0-9]{8}|[0]{1}[5]{1}[0-9]{1}-[0-9]{7}"
                                   placeholder="שדה חובה" required onChange={this.onChange} value={this.state.phone} maxLength='20'/>
                            <label>תאריך</label>
                            <input id="date" name="date" className="form-control" type="date" max="2020-01-01" min="2019-01-01"
                                   placeholder="שדה חובה" required onChange={this.onChange} value={this.state.date}/>

                        <label>כמות משתתפים</label>
                        <select id="participants" name="participants" className="form-control"
                                onChange={this.onChange} value={this.state.participants}>
                            <option defaultValue="small">עד 20</option>
                            <option value="medium">20-40</option>
                            <option value="big">40+</option>
                        </select>
                            <label>אורך ההרצאה (בדקות)</label>
                            <input id="length" name="length" className="form-control" type="number" placeholder="שדה חובה" required
                                   min="30" step="15" onChange={this.onChange} value={this.state.length} max="360"/>
                            <label>שעה מועדפת</label>
                            <input id="hour" name="hour" className="form-control" type="time"
                                   min='09:00' max='23:00' step="900" required onChange={this.onChange} value={this.state.hour}/>
                            <label>נושא השיעור</label>
                            <input id="description" name="description" className="form-control" type="textarea"
                                   onChange={this.onChange} value={this.state.description} maxLength="20"/>
                            <button name="button" type="button" className="btn btn-dark"
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

    onSubmit(){
        const class_request = {
            name: this.state.name,
            phone: this.state.phone,
            date: this.state.date,
            participants: this.state.participants,
            length: this.state.length,
            hour: this.state.hour,
            description: this.state.description,
        };
        return this.props.submitRequest(class_request);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        }
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {

    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({submitRequest: submitRequest}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(RequestForm);

