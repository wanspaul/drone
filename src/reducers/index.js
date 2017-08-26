import {combineReducers} from 'redux';
import Events from './Events';
import Person from './Person';

const reducers = combineReducers({
    Events, Person
});

export default reducers;
