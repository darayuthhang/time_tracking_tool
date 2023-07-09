
import axios from '../../axios/Axios';
import { logError, logSuccess } from '../../uti/error-handle';
import { API_VERSION } from '../../constant/index';
import { StripeType } from '../constants/StripeTypes';
import { UserTypes } from '../constants/UserTypes';

export const unsubscribe = (userId) => async (dispatch) => {
    try {
        dispatch({ type: StripeType.UNSUBSCRIBE_REQUEST })
        const { data } = await axios.get(`${API_VERSION}/stripe-payment/unsubscribe/${userId}`);
        logSuccess(data)
        dispatch({ type: StripeType.UNSUBSCRIBE_SUCCESS, payload: data })
        // const object = {
        //     success:true,
        //     data:
        // }
        // dispatch({ type: UserTypes.GET_ACCOUNT_TYPE_SUCCESS, payload: { account_type:"free"}})
        // dispatch({})
    } catch (error) {
        logError(error)
        dispatch({ type: StripeType.UNSUBSCRIBE_ERROR, payload: error.message })
    }
}
export const resetUnsubscribeSuccess = () =>  {
    return {
        type: StripeType.RESET_UNSUBSCRIBE_SUCCESS
    }
}
