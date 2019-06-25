export default function(state = null, action){
    switch(action.type){
        case 'REQ_SENT':
            return action.payload;
        case 'REQ_SELECTED':
            return action.payload;
    }
     return state;
    }


