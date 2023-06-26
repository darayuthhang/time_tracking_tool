import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Form, Container, Button, Alert, Row, Col } from 'react-bootstrap'
import BackEndPoint from '../../constant/BackEndPoint';
import axios from '../../axios/Axios';
import { logError, logSuccess } from '../../uti/error-handle';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import useStripePayment from '../../hooks/useStripePayment';
import { loadStripe } from "@stripe/stripe-js";
import Cookie from '../../uti/Cookie';
import ReactEndPoint from '../../constant/ReactEndPoint';
import { API_VERSION } from '../../constant/index';
import BoxInputComponent from './BoxInputComponent';
const VerifyUser = () => {
    const [firstCode, setFirstCode] = useState("");
    const [secondCode, setSecondCode] = useState("");
    const [thirdCode, setthirdCode] = useState("");
    const [fourthCode, setfourthCode] = useState("");
    const [fifthCode, setfifthCode] = useState("");
    const [sixCode, setSixCode] = useState("");
    const [stripePayment, makePayment, loading] = useStripePayment();

    const [codeError, setCodeError] = useState("");
    const [validateCodeError, setValidateCodeError] = useState("");
    const [success, setSuccess] = useState(false);
    const [successVerifyLoading, setsuccessVerifyLoading] = useState(false);
    const [successVerifyResentLoading, setsuccessVerifyResentLoading] = useState(false);
    const { email } = useSelector((state) => state.userSignUpReducers)
    let { state} = useLocation();
    const navigate = useNavigate();
    const secondInputRef = useRef();
    const thirdInputRef = useRef();
    const fourtInputRef = useRef();
    const fiveInputRef = useRef();
    const sixInputRef = useRef();
    const user = Cookie.getUser();

    let publicKey = "";

    if (process.env.REACT_APP_STAGE === 'local') {
        const public_keyTest = "pk_test_51McF1jEHMSSFUM4oN3TEldrqEvncNMzwE4dsPn0yrQOCLV4nDrt6SDtNyPcn8E91pCSWgAU00PCJlJQgKes8bOaD00ImS9XRmF";
        publicKey = public_keyTest
    } else {
        const livePublicKey = "pk_live_51McF1jEHMSSFUM4oUOymcB4bgrrAQlHAuDF92t2gp4gTV1jr00bbUO8LNB6ehO1FhaFL1yCiT11ac0Fqq3Jo5y7s00wS13lJhO"
        publicKey = livePublicKey
    }
    /**
     * @todo
     * - after user veriy user
     * - Bug [] - cannot verifuser if i add stripe payment.
     * - navigate to stripe payment
     * - after stripe payment navigate to task page
     */
    useEffect(() => {
      
      if(success){
          setSuccess(false);
          if(isAccountPro()){
              const makePayment = async () => {
                  const body = { userId: user?.userId }
                  const stripe = await loadStripe(publicKey);
                  // const body = { product };
                  try {
                      let response = await axios.post(`${API_VERSION}/create-checkout-session`, body)
                      const session = response;;
                      const result = stripe.redirectToCheckout({
                          sessionId: session?.data?.id,
                      });
                  } catch (error) {
                      console.log(error);
                  }
              };
              makePayment();
          }else{
              navigate(ReactEndPoint.LOGIN)
          }
      }
      return () => {
        
      }
    
    }, [success])
    
    const isAccountPro = () => {
        return state?.accountType === "Pro";
    }
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
            /**
             * @description Navigate with payment if user verify 
             * with pro account.
             */
            setSuccess(true);
            
        
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
