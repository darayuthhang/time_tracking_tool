import React, { useState, useRef } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Form, Container, Button, Alert, Row, Col } from 'react-bootstrap'
import BackEndPoint from '../../constant/BackEndPoint';
import axios from '../../axios/Axios';
import { logError, logSuccess } from '../../uti/error-handle';
import { useSelector, dispatch, useDispatch } from 'react-redux';

import Cookie from '../../uti/Cookie';
import ReactEndPoint from '../../constant/ReactEndPoint';
import BoxInputComponent from './BoxInputComponent';
const VerifyUser = () => {
    const [firstCode, setFirstCode] = useState("");
    const [secondCode, setSecondCode] = useState("");
    const [thirdCode, setthirdCode] = useState("");
    const [fourthCode, setfourthCode] = useState("");
    const [fifthCode, setfifthCode] = useState("");
    const [sixCode, setSixCode] = useState("");

    const [codeError, setCodeError] = useState("");
    const [validateCodeError, setValidateCodeError] = useState("");
    const [successVerifyLoading, setsuccessVerifyLoading] = useState(false);
    const [successVerifyResentLoading, setsuccessVerifyResentLoading] = useState(false);
    const { email } = useSelector((state) => state.userSignUpReducers)

    const navigate = useNavigate();
    const secondInputRef = useRef();
    const thirdInputRef = useRef();
    const fourtInputRef = useRef();
    const fiveInputRef = useRef();
    const sixInputRef = useRef();

    const refFocus = (inputRef, value) => {
        if(value !== "") inputRef.current?.focus();
    }
    const onhandleChangeFirstCode = (e) => {
        // validateInput(e.target.value)
        const {value} = e.target;
        setFirstCode(value)
        refFocus(secondInputRef, value)
        resetStateToDefault();
    }
    const onhandleChangeSecondCode = (e) => {
        const { value } = e.target;
        setSecondCode(value)
        refFocus(thirdInputRef, value)
        resetStateToDefault();
    }
    const onhandleChangeThirdCode = (e) => {
        const { value } = e.target;
        setthirdCode(value)
        refFocus(fourtInputRef, value)
        resetStateToDefault();
    }
    const onhandleChangeFourthCode = (e) => {
        const { value } = e.target;
        setfourthCode(value)
        refFocus(fiveInputRef, value)
        resetStateToDefault();
    }
    const onhandleChangeFifthCode = (e) => {
        const { value } = e.target;
        setfifthCode(value)
        refFocus(sixInputRef, value)
        resetStateToDefault();
    }
    const onhandleChangeSixCode = (e) => {
        setSixCode(e.target.value)
        resetStateToDefault();
    }
    const apiPostMethod = async () => {
        let verificationCode = firstCode + secondCode + thirdCode + fourthCode + fifthCode + sixCode;
        setsuccessVerifyLoading(true);
        /**
         *  verificationCode, email
         *  Todo 
         *  - send to back-end
         *  - add loading to verify
         *  - display error in the front-end code not match
         */

        try {
            let response = await axios.post(BackEndPoint.VERIFY_USER, { verificationCode, email })
            logSuccess(response)
            //delete user email cookie when validate code success.
            Cookie.removeEmail();
            setsuccessVerifyLoading(false)
            navigate(ReactEndPoint.LOGIN)
        } catch (error) {
            /**
         * 404 Verificationcode expired
         * 500 verifcation code not match.
         */

            if (error?.response?.status === 404) {
                setValidateCodeError("Verification code expired")
            } else if (error?.response?.status === 500) {
                setValidateCodeError("Verifcation code not match")
            }
            logError(error, error.message)
            setsuccessVerifyLoading(false);

        }
    }
    const apiPostMethodOtp = async () => {
        setsuccessVerifyResentLoading(true)
        try {
            let response = await axios.post(BackEndPoint.RESENT_OTP, { email })
            setsuccessVerifyResentLoading(false)
            logSuccess(response)
        } catch (error) {
            if (error?.response?.status === 404) {
                setValidateCodeError("Verification code expired")
            } else if (error?.response?.status === 500) {
                setValidateCodeError("Verifcation code not match")
            }
            setsuccessVerifyResentLoading(false)
            logError(error, error.message)
        }
    }
    const onhandleSubmitVerificationCode = (e) => {
        e.preventDefault();

        if (firstCode
            && secondCode
            && thirdCode
            && fourthCode
            && fifthCode
            && sixCode) {
            //submiot
            apiPostMethod()
        }
        else {
            setCodeError("OPT code cannot be empty.")
        }
    }

    const onhandleHandleResentOtp = (e) => {
        e.preventDefault();
        apiPostMethodOtp();
    }

    const resetStateToDefault = () => {
        setCodeError("")
        setValidateCodeError("");
        // setsuccessVerifyLoading(false);
        // setsuccessVerifyResentLoading(false);
    }
    return (
        <div style={{ height: '100vh' }} className='d-flex align-items-center'>
            <Container className=' '>
                <Row className='justify-content-center'>
                    <Col md={5}>
                        <Form className='' onSubmit={onhandleSubmitVerificationCode}>
                            <div className='text-center'>
                                <h2>Verifcation</h2>
                                <p>Enter your OPT code number</p>
                                <div className='border p-3'>
                                    <div className=' d-flex gap-3 '>
                                        <BoxInputComponent 
                                                onhandleChange={onhandleChangeFirstCode}
                                           
                                                // value={firstCode}
                                        />
                                        <BoxInputComponent 
                                            onhandleChange={onhandleChangeSecondCode}
                                            refInput={secondInputRef}
                                        />
                                        <BoxInputComponent
                                            onhandleChange={onhandleChangeThirdCode}
                                            refInput={thirdInputRef}
                                        />
                                        <BoxInputComponent
                                            onhandleChange={onhandleChangeFourthCode}
                                            refInput={fourtInputRef}
                                        />
                                        <BoxInputComponent
                                            onhandleChange={onhandleChangeFifthCode}
                                            refInput={fiveInputRef}
                                        />
                                        <BoxInputComponent
                                            onhandleChange={onhandleChangeSixCode}
                                            refInput={sixInputRef}
                                        />
                                        
                                          
                                      
                                            {/* <input
                                                type="text"
                                                class="form-control  fs-3 p-1"
                                                onChange={onhandleChangeSecondCode}
                                                placeholder=""
                                            />
                           
                                     
                                            <input
                                                type="text"
                                                class="form-control  fs-3 p-1"
                                                onChange={onhandleChangeThirdCode}
                                                placeholder=""
                                            />
                                     
                                 
                                            <input
                                                type="text"
                                                class="form-control  fs-3 p-1"
                                                onChange={onhandleChangeFourthCode}
                                                placeholder=""
                                            />
                                     
                                      
                                            <input
                                                type="text"
                                                class="form-control  fs-3 p-1"
                                                onChange={onhandleChangeFifthCode}
                                                placeholder=""
                                            />
                                   
                                       
                                            <input
                                                type="text"
                                                class="form-control  fs-3 p-1"
                                                onChange={onhandleChangeSixCode}
                                                placeholder=""
                                            /> */}
                                      
                                    </div>
                                    <Button
                                        type='submit'
                                        disable={successVerifyLoading}
                                        className='w-100 shadow rounded mt-3'>
                                        {successVerifyLoading ? 'Loading' : 'Verify'}
                                    </Button>
                                    {codeError && <Alert variant="danger">{codeError}</Alert>}
                                    {validateCodeError && <Alert variant='danger'>{validateCodeError}</Alert>}
                                </div>
                                <div>
                                    Didn't you receive any code?
                                </div>
                                <a href="#" onClick={onhandleHandleResentOtp}>
                                    {successVerifyResentLoading ? "Loading" : "Resend New Code"}
                                    </a>
                            </div>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default VerifyUser;
