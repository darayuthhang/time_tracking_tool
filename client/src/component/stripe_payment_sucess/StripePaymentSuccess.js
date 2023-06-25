import React from 'react';
import ReactEndPoint from '../../constant/ReactEndPoint';
import {Navigate} from 'react-router-dom';

const StripePaymentSuccess = () => {
    return (
        <Navigate to={ReactEndPoint.TASK} replace={true} />
    );
};

export default StripePaymentSuccess;
