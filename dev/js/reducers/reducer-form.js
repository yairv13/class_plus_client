import {store} from "../index";

export default function(state = null, action){
    switch(action.type){
        case 'REQ_SENT':
            store.class_requests = action.payload; //store the class_requests globally
            return action.payload;
        case 'REQ_SELECTED':
            return action.payload;
    }
     return state;
    }


