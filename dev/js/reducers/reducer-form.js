import {store} from "../index";
import axios from 'axios'

export default function(state = null, action){
    switch(action.type){
        case 'REQ_SENT':
            //store the class_requests globally
            store.class_requests = action.payload;
            //store new event in all events DB table
            axios.post('https://localhost:8000/api/events/all', {
                    params: {
                        name: action.payload.name,
                        phone: action.payload.phone,
                        date: action.payload.date,
                        _class: action.payload._class,
                        hour: action.payload.hour,
                        hour_to: action.payload.hour_to,
                        description: action.payload.description
                    }
                }
            )
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            return action.payload;
        case 'REQ_SELECTED':
            return action.payload;
    }
     return state;
    }


