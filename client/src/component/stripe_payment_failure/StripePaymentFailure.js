import React from 'react';
import ReactEndPoint from '../../constant/ReactEndPoint';
import {
    useNavigate,
    Link,
    Navigate
} from 'react-router-dom';
const StripePaymentFailure = () => {
    return (
        <Navigate to={ReactEndPoint.TASK} replace={true} />
    );
};

export default StripePaymentFailure;
