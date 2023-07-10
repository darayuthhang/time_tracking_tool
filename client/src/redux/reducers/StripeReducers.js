import { StripeType } from "../constants/StripeTypes";
export function stripeUnsubscribeReducers(state = {
    stripeUnsubscribeRequest: false,
    stripeUnsubscribeSuccess: false,
    stripeUnsubscribeError: null
}, action) {
    switch (action.type) {
        case StripeType.UNSUBSCRIBE_REQUEST:
            return { ...state, stripeUnsubscribeRequest: true };
        case StripeType.UNSUBSCRIBE_SUCCESS:
            return { ...state, stripeUnsubscribeSuccess: true, stripeUnsubscribeRequest: false };
        case StripeType.UNSUBSCRIBE_ERROR:
            return { ...state, stripeUnsubscribeError: action.payload, stripeUnsubscribeRequest: false };
        case StripeType.RESET_UNSUBSCRIBE_SUCCESS:
            return { ...state, stripeUnsubscribeSuccess: false, stripeUnsubscribeRequest: false };
        default: return state;
    }
}
