import React from 'react';
import {Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactEndPoint from '../../constant/ReactEndPoint';
const PricingCard = ({
    firstText,
    secondText,
    thirdText,
    fourthText,
    fifthText,
    feeText,
    bgColor,
    textColor,
    buttonColor,
    accountType
}) => {
    return (
        <div>
            <Card style={{ width: '18rem', height: '22rem' }} 
                className={` ${bgColor} p-5 ${textColor} justify-content-center gap-3 `}> 
                <div>{firstText}</div>
                <div>{secondText}</div>
                <div className='fw-bold fs-3'>{feeText}</div>
                <div class="d-flex gap-2">
                    <i class="bi bi-check-circle"></i>
                    <label class="form-check-label" for="flexCheckDefault">
                        {thirdText}
                    </label>
                </div>
                <div class="d-flex gap-2">
                    <i class="bi bi-check-circle"></i>
                    <label class="form-check-label" for="flexCheckDefault">
                        {fourthText}
                    </label>
                </div>
                <Link 
                    state={{ accountType }}
                    to={ReactEndPoint.SIGN_UP} 
                    className={`btn ${buttonColor} btn-sm`}>
                    {fifthText}
                </Link>
              
                
              
            </Card>
        </div>
    );
};

export default PricingCard;
