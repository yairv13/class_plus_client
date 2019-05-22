import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import ListGroup from "react-bootstrap/ListGroup";
import {selectRequest} from "../actions";
import {store} from '../index';
import GantForm from '../containers/GantForm';


class RequestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            class_requests: store.getState().class_requests,
            cur_req: store.getState().cur_req //current request to fill in gant
        };
        this.onClick = this.onClick.bind(this);
    }

    render() {
        if (store.class_requests)
                return (
                    <div>
                        {store.popUp && <GantForm/>}
                        <ListGroup>
                            {
                                store.class_requests.map((cls_req, index) => {
                                        store.cur_req = cls_req;
                                    return <ListGroup.Item key={index} onClick={this.onClick}>{cls_req.name}</ListGroup.Item>
                                    }
                                )}
                        </ListGroup>
                    </div>
                );
            }


    onClick() {
        store.popUp = !store.popUp;
        this.forceUpdate();
    }
}

function mapStateToProps(state) {
    return {
        class_requests: state.class_requests
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch) {
    return bindActionCreators({selectRequest: selectRequest}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(RequestList);

