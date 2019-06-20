import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import ListGroup from "react-bootstrap/ListGroup";
import {selectRequest} from "../actions";
import {store} from '../index';
import GantForm from '../containers/GantForm';
import axios from 'axios';

class RequestList extends React.Component {
    constructor(props) {
        super(props);
        //get all unassigned requests
        this.state = {
            cur_req: store.getState().cur_req, //current request to fill in gant
            unassigned_requests: [] //all unassigned class requests
        };
        this.onClick = this.onClick.bind(this);
    }

    //before rendering - set the state with the latest unassigned requests
    async componentWillMount() {
        await this.getUnassignedRequests().then(req => {
            this.setState({unassigned_requests: req});
        });
    }

    //render the RequestList at the right corner - if it isn't empty
    //store.popUp flags true on class click for Modal pop up
    render() {
        console.log(this.state.unassigned_requests);
        if (this.state.unassigned_requests) //GET request ended
            return (
                <div>
                    {store.popUp && <GantForm/>}
                    {this.RequestsNotEmpty() && <ListGroup>
                        {
                            this.state.unassigned_requests.map((cls_req, index) => {
                                    store.cur_req = cls_req;
                                    return <ListGroup.Item key={index} onClick={this.onClick}
                                                           variant={nextVariant(index)}>
                                        {cls_req.name}
                                    </ListGroup.Item>
                                }
                            )
                        }
                    </ListGroup>
                    }
                </div>
            );
        else
            return (<span>Loading...</span>);
    }


    onClick() {
        store.popUp = true;
        this.setState({state: this.state});
    }

    //GET request for all unassigned events from DB
    async getUnassignedRequests() {
        let reqs = null;
        //get all unappointed class requests:
        await axios.get('http://localhost:8000/api/events/all/', store.config)
            .then(req => {
                reqs = req.data
            })
            .catch(error => {
                console.log('Error getting unassigned requests, ', error);
                return [];
            });
        return reqs;
    }

    //return if the unassigned request list isn't empty
    RequestsNotEmpty() {
        return (this.state.unassigned_requests.length !== 0);
    }
}

//select next label color
function nextVariant(index) {
    switch (index + 3 % 7) {
        case 0:
            return "light";
        case 1:
            return "primary";
        case 2:
            return "danger";
        case 3:
            return "success";
        case 4:
            return "warning";
        case 5:
            return "info";
        case 6:
            return "secondary";
        case 7:
            return "dark";
    }
}

function mapStateToProps(state) {
    return {
        unassigned_requests: state.unassigned_requests
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

