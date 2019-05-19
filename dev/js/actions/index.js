export const submitRequest = (class_request) => {
    alert("בקשתך התקבלה ותיענה בהקדם :)");
    //route to google
    return {
        type: 'REQ_SENT',
        payload: class_request
    }
};

export const transferClasses = (classes) => {
       return {
        type: 'CLASSES_SEND',
        payload: classes
    }
};