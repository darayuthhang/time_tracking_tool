import { combineReducers } from 'redux';
import { 
    userSignUpReducers,
    userLoginReducers,
    googleUserLoginReducers } from './UserReducers';
import { authReducers } from './AuthReducers';
import { 
    projectReducers,
    projectListReducers } from './ProjectReducers';
import { taskReducers } from './TaskReducers';


const allReducers = combineReducers({
    userSignUpReducers,
    userLoginReducers,
    googleUserLoginReducers,
    authReducers,
    projectReducers,
    projectListReducers,
    taskReducers
})
export default allReducers;
