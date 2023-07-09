import { combineReducers } from 'redux';
import { 
    userSignUpReducers,
    userLoginReducers,
    googleUserLoginReducers,
    accountTypeReducers } from './UserReducers';
import { authReducers } from './AuthReducers';
import { 
    projectReducers,
    projectListReducers,
    projectUpdateReducers,
    projectDeleteReducers } from './ProjectReducers';
import { 
    taskReducers,
    taskListReducers,
    taskListDeleteReducers,
    taskUpdateReducers } from './TaskReducers';
import {
    createPhoneConsentReducers
} from './ConsentReducers'
import { stripeUnsubscribeReducers } from './StripeReducers'
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
    projectUpdateReducers,
    projectDeleteReducers,
    createPhoneConsentReducers,
    accountTypeReducers,
    stripeUnsubscribeReducers
})
export default allReducers;
