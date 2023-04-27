import { combineReducers } from 'redux';
import { 
    userSignUpReducers,
    userLoginReducers,
    googleUserLoginReducers } from './UserReducers';
import { authReducers } from './AuthReducers';
import { projectReducers } from './ProjectReducers';

const allReducers = combineReducers({
    userSignUpReducers,
    userLoginReducers,
    googleUserLoginReducers,
    authReducers,
    projectReducers
})
export default allReducers;
