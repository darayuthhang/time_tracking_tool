import { combineReducers } from 'redux';
import { 
    userSignUpReducers,
    userLoginReducers,
    googleUserLoginReducers } from './UserReducers';
import { authReducers } from './AuthReducers';
import { 
    projectReducers,
    projectListReducers,
    projectUpdateReducers } from './ProjectReducers';
import { 
    taskReducers,
    taskListReducers,
    taskListDeleteReducers,
    taskUpdateReducers } from './TaskReducers';


const allReducers = combineReducers({
    userSignUpReducers,
    userLoginReducers,
    googleUserLoginReducers,
    authReducers,
    projectReducers,
    projectListReducers,
    taskReducers,
    taskListReducers,
    taskListDeleteReducers,
    taskUpdateReducers,
    projectUpdateReducers
})
export default allReducers;
