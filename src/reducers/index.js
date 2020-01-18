 import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
 import projectReducer from './projectTaskReducer';

 export default combineReducers({
    // TODO : Decalre all reduceers here to be able create more than one reduce
    // 
    errors:errorReducer ,
    project_tasks:projectReducer
 });