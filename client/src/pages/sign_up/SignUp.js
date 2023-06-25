import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Form, Container, Button, Alert, Row, Col } from 'react-bootstrap'
import { signup, googleLogin, resetSignupSuccess, resetGoogleSignupSuccess, resetGoogleLoginError, resetSignupError } from '../../redux/action/UserAction';
import { useSelector, dispatch, useDispatch } from 'react-redux';
// import { signup, sendNewLinkToVerifyUser, resetSignUpSuccess } from '../../redux/action/UserAction';
import ReactEndPoint from '../../constant/ReactEndPoint';
import {
    useGoogleLogin,
} from '@react-oauth/google';
import useStripePayment from '../../hooks/useStripePayment';

const Signup = () => {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState("");
    const { googleLoginError, googleLoginSuccess } = useSelector((state) => state.googleUserLoginReducers)
    const { signUpRequest, signUpSuccess, signUpError } = useSelector((state) => state.userSignUpReducers ) 
    const [stripePayment, makePayment, loading] = useStripePayment();

    const dispatch = useDispatch();
    let { state } = useLocation();
    const navigate = useNavigate();

    const isAccountPro = () => {
        return state?.accountType === "Pro";
    }
    /**
     * Sigup wit pro --> verify user ---> send to stripe
     */
    const resetErrorStateToDefault = () => {
        dispatch(resetSignupError());
        dispatch(resetGoogleLoginError())

    }
    useEffect(() => {
        resetErrorStateToDefault();
        if (signUpSuccess && isAccountPro()) {
            dispatch(resetSignupSuccess());
            navigate(ReactEndPoint.VERIFY_USER, {
                state: {
                    accountType:"Pro"
                }
            })
           
        }
        else if (googleLoginSuccess && isAccountPro()) {
            dispatch(resetGoogleSignupSuccess());
            makePayment();
        }
        else if (signUpSuccess) {
            dispatch(resetSignupSuccess());
            navigate(ReactEndPoint.VERIFY_USER)
        }
        else if (googleLoginSuccess) {
            dispatch(resetGoogleSignupSuccess());
            navigate(ReactEndPoint.TASK)
        }
      return () => {
      
      }
    }, [signUpSuccess, googleLoginSuccess])
    
    const onhandleChangeFirstName = (e) => {
        setFirstname(e.target.value)
        resetErrorStateToDefault()
    }
    const onhandleChangeLastName = (e) => {
        setLastName(e.target.value)
        resetErrorStateToDefault()
    }
    const onhandleChangeEmail = (e) => {
        setEmail(e.target.value)
        resetErrorStateToDefault()
    }

    const onhandleChangePassword = (e) => {
        setPassword(e.target.value)
        resetErrorStateToDefault();
        const regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
       
        if (e.target.value.length < 8 && e.target.value.length > 0) {
            setPasswordError('Password must be at least 8 characters');
        } else if (!regex.test(e.target.value) && e.target.value.length > 0){
            setPasswordError('Password must contain at least one letter and one number');
        } else {
            setPasswordError('');
        }
    }
 
    const onhandleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(signup(firstName, lastName, email, password));
    }
    const handleLoginSuccess = (response) => {
        const googleTokenExist = response?.access_token;

        if (googleTokenExist) {
            dispatch(googleLogin(googleTokenExist, "sign_up"))
        } else {
            console.log("Google token does not exist. ");
        }
    };
    const GoogleApiLogin = useGoogleLogin({
        onSuccess: tokenResponse => handleLoginSuccess(tokenResponse),
    });
    
   
    // if(signUpSuccess){
    //     return(
    //         <Navigate to={ReactEndPoint.VERIFY_USER} replace={true} />
    //     )
    // }
    // if(googleLoginSuccess){
    //     if(isAccountPro()){
    //         //redirect to stripe
    //         return makePayment();
    //     }else{
    //         return <Navigate to={ReactEndPoint.TASK} replace={true} />
    //     }
    // }
        return (
            <div style={{ height: "100vh", backgroundColor: "#f2f2f2" }} >
                <Container className='h-100'>
                    <Row className='justify-content-center '>
                        <Col md={5} className='align-items-center border border-secondary border-2 p-5 rounded'>
                            <Form onSubmit={onhandleSubmit} className='mb-3 '>
                                <h3 className='mb-4'>SIGN UP</h3>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        onChange={onhandleChangeEmail}
                                        required
                                    />
                                    {signUpError === 404 && <Alert variant="danger">Email already exist.</Alert>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="FirstName"
                                        onChange={onhandleChangeFirstName}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="LastName"
                                        onChange={onhandleChangeLastName}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="password"
                                        onChange={onhandleChangePassword}
                                        required
                                    />
                                    {passwordError && <Alert variant="danger">{passwordError}</Alert>}
                                </Form.Group>
                                <Button
                                    className='w-100 shadow  rounded'
                                    disabled={signUpRequest}
                                    type="submit"
                                >
                                    {signUpRequest ? 'Loading' : 'SIGN UP'}
                                </Button>
                               
                               
                            </Form>
                            <Button onClick={(e) => {
                                e.stopPropagation();
                                GoogleApiLogin()
                            }}
                                className="w-100 mt-2 mb-2">
                                Sign up with Google 🚀{' '}
                            </Button>
                            <div className='d-flex justify-content-center gap-3 mt-3'>
                                <p>Already a user? </p>
                                <Link to={ReactEndPoint.LOGIN}>LOGIN</Link>
                            </div>
                            {signUpError === 404 &&
                                <Alert variant="danger">
                                    User already exist.
                                </Alert>
                            }
                            {signUpError === 500 &&
                                <Alert variant="danger">
                                    Internal server not found
                                </Alert>
                            }
                            {signUpError === 400 &&
                                <Alert variant="danger">
                                    Please activate your account.
                                </Alert>
                            }
                            {googleLoginError === 404 &&
                                <Alert variant="danger">
                                    User already exist.
                                </Alert>
                            }
                            {googleLoginError === 500 &&
                                <Alert variant="danger">
                                    User already exist.
                                </Alert>
                            }
                            {googleLoginError === 400 &&
                                <Alert variant="danger">
                                    Please activate your account.
                                </Alert>
                            }
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    
   
};

export default Signup;
