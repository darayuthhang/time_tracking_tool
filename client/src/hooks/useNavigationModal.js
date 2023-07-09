import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUnsubscribeSuccess, unsubscribe } from '../redux/action/StripeAction';

export const useUnSubscribeModal = (initialValue, userId) => {
    const [unSubscribeModalShow, setShow] = useState(initialValue);
    const {
        stripeUnsubscribeSuccess,
        stripeUnsubscribeError } = useSelector((state) => state.stripeUnsubscribeReducers)
    useEffect(() => {
        if (stripeUnsubscribeSuccess) {
            setShow(false);
        }
      return () => {
      }
    }, [stripeUnsubscribeSuccess])
    
   
    const dispatch = useDispatch();
    const handleUnSubscribeModalClose = () => setShow(false);
    const handleUnSubscribeModalShow = () => setShow(true);
    const handleUnsubcribe = () => {
        dispatch(unsubscribe(userId))
    }
    // if (stripeUnsubscribeSuccess) {
    //     // setShow(false)
    //     dispatch(resetUnsubscribeSuccess())
    // };
    return [handleUnSubscribeModalShow, handleUnSubscribeModalClose, unSubscribeModalShow, handleUnsubcribe]
}
