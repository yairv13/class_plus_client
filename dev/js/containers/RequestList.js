import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import ListGroup from "react-bootstrap/ListGroup";
import {selectRequest} from "../actions";
import {store} from '../index';


class RequestList extends React.Component{
    constructor(props){
        super(props);
        this.state = {class_requests: store.getState().class_requests};
        this.onClick = this.onClick.bind(this);
    }

    render(){
        //if(localStorage.getItem('class_requests'))
         if(store.class_requests)
        {
        return (
            <ListGroup>
                {
                    store.class_requests.map((cls_req, index) =>
                    <ListGroup.Item key={index} onClick={this.onClick}>{cls_req.name}</ListGroup.Item>
                )}
            </ListGroup>
        );}
        else
            return <div> </div>;
    }

    onClick(e){

    }
}

function mapStateToProps(state) {
    return {
        class_requests: state.class_requests
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectRequest: selectRequest}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(RequestList);

