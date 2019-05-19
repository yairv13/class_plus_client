export default function(state = null, action){
    switch(action.type){
        case 'REQ_SENT':
            console.log (action.payload);
            return action.payload;
            break;
    }
    return state;
}