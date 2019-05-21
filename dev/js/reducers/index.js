import {combineReducers} from 'redux';
import FormReducer from './reducer-form';
import ClassesReducer from './reducer-classes';
import HoursReducer from './reducer-hours';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    form: FormReducer,
    classes: ClassesReducer,
    hours: HoursReducer,
});

export default allReducers;
