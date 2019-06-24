import axios from 'axios';
import {store} from '../index'

//fill class table with all today's events
export const fillTable = (date) => {
    //set all today's events array
    let data = {};
    //get all today's events
    axios.get('http://localhost:8000/api/assigned_events/' + date + '/',
        store.config)
        .then(req => {
            data = req.data;
            //draw the table and keep the rows stored in previous_rows
            drawTable(data);
        })
        .catch(error => {
            console.log('Error getting assigned requests, ', error);
        });
    return {
        type: 'TABLE_FILLED'
    }
};

export const submitRequest = (class_request) => {
    axios.post('http://localhost:8000/api/unassigned_events/',
        {
            name: class_request.name, phone: class_request.phone, date: class_request.date, cls_id: class_request.cls_id,
            hour: class_request.hour, hour_to: class_request.hour_to, description: class_request.description
        }, store.config
    )
        .then(response => {})
        .catch(error => {
            alert(error);
        });
    return {
        type: 'REQ_SENT',
        payload: class_request
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

//return cls_id by its name
export const getClassID = (_class => {
        let id;
        switch (_class) {
            case "כיתה א":
                id = 1;
                break;
            case "כיתה ב":
                id = 2;
                break;
            case "כיתה ג":
                id = 3;
                break;
            case "כיתה ד":
                id = 4;
                break;
            case "כיתה ה":
                id = 5;
                break;
            case "כיתה ו":
                id = 6;
                break;
            case "כיתה ז":
                id = 7;
                break;
            case "כיתה ח":
                id = 8;
                break;
            case "כיתה ט":
                id = 9;
                break;
            case "כיתה י":
                id = 10;
                break;
            case "כיתה יא":
                id = 11;
                break;
            case "כיתה יב":
                id = 12;
                break;
            case "כיתה יג":
                id = 13;
                break;
            case "כיתה יד":
                id = 14;
                break;
            default:
                id = 1;
        }
        return{
        type: 'ID_REQUESTED',
        payload: id
    }
    }
);

/*helper functions:*/

//return how many rows are to be painted
//each collumn contains 4 rows;
function calcRows(hour, hour_to) {
    //each hour = 4 rows
    const hoursDiff = (parseInt(hour_to.substring(0, 2)) - parseInt(hour.substring(0, 2)) + 1) * 4;
    //each 1/4 an hour = 1 row
    const minsDiff = (parseInt(hour.substring(3, 5)) - parseInt(hour_to.substring(3, 5))) / 15;
    console.log("rows to paint:" + (hoursDiff+minsDiff));
    return hoursDiff + minsDiff; //add or subtract in accordance to the case
}

//add 15 minutes to the time
function addQuarter(time) {
    let timeInt = parseInt(time.substring(3, 5)) + 15;
    if (timeInt === 60)
        return (parseInt(time.substring(0, 2)) + 1).toString() + ":00"; //return +1 hour
    return time.substring(0, 3) + timeInt.toString(); //return +!5 minutes
}

//return a random color
function getRandomColor() {
    //TODO: not blue-ish colors
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function drawTable(data) {
    //draw each event in the class table
    data.map(event => {
            if (event.cls_id === undefined) {
                console.log("no events today");
                return;
            }
            const name = event.name,
                phone = event.phone,
                date = event.date,
                cls_id = event.cls_id,
                hour = event.hour,
                hour_to = event.hour_to,
                description = event.description;
            //calculate how many rows are needed to be painted
            //(foreach event)
            const rowsNumber = calcRows(hour, hour_to);
            let time = hour; //event start time
            /*paint rows with a random color*/
            //get a random color
            let randomColor = getRandomColor();
            //for each row: paint + add tool-tip
            for (let i = 0; i < rowsNumber; i++) {
                //get row
                const row_id = cls_id + time;
                const row = document.getElementById(row_id);
                console.log(row);
                //paint raw
                if (row) {
                    //random paint for each class
                    row.style.backgroundColor = randomColor;
                    //tool-tip with event details
                    row.tooltip = "LOL"
                        //name + '\n' + phone + '\n' + hour + " - " +
                        //hour_to + '\n' + description;
                }
                //add 15 minutes to the time
                time = addQuarter(time);
            }
        }
    );
}
