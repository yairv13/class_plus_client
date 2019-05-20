export default function(state = null, action){
    switch(action.type){
        case 'REQ_SENT':
            return action.payload;
    }
    return state;
}

