export const submitRequest = (class_requests) => {
    //route to google
    return {
        type: 'REQ_SENT',
        payload: class_requests
    }
};

export const transferClasses = (classes) => {
       return {
        type: 'CLASSES_SENT',
        payload: classes
    }
};

export const transferHours = (hours) => {
       return {
        type: 'HOURS_SENT',
        payload: hours
    }
};

export const selectRequest = (class_request) => {
       return {
        type: 'REQ_SELECTED',
        payload: class_request
    }
};

