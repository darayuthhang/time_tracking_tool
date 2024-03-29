
import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Form, Container, Button, Alert, Row, Col, Stack } from 'react-bootstrap'
import { login, resetLoginError, googleLogin, resetGoogleLoginError } from '../../redux/action/UserAction';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import ReactEndPoint from '../../constant/ReactEndPoint';
import { 
    useGoogleOneTapLogin, 
    useGoogleLogin,
    GoogleLogin } from '@react-oauth/google';




const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loginRequest, loginSuccess, loginError } = useSelector((state) => state.userLoginReducers)
    const { googleLoginError, googleLoginSuccess } = useSelector((state) => state.googleUserLoginReducers)

    useEffect(() => {
        const isMessengerInAppBrowser = /FBAN|FBAV/i.test(window.navigator.userAgent);

        if (isMessengerInAppBrowser) {
            const message = "To provide the best user experience, we recommend opening the Google login page in a regular web browser instead of the Messenger in-app browser."
            const shouldOpenInSafari = window.confirm(message);

            // if (shouldOpenInSafari) {
            //     window.open('https://www.taskkru.com/login', '_blank');
            // }
        }
        return () => {

        }
    }, [])
    const onhandleChangeEmail = (e) => {
        setEmail(e.target.value)
        handleResetAllInputToDefault();
    }
    const onhandleChangePassword = (e) => {
        setPassword(e.target.value)
        handleResetAllInputToDefault();
    }
    const handleResetAllInputToDefault = () => {
        dispatch(resetLoginError());
        if(googleLoginError) dispatch(resetGoogleLoginError());
    }
    const onhandleSubmit = (e) => {
        e.preventDefault();
        if(email && password) dispatch(login(email, password))
    }
    const handleLoginSuccess = (response) => {
        const googleTokenExist = response?.access_token;
        if (googleTokenExist) {
            dispatch(googleLogin(googleTokenExist, "login"))
        } else {
            console.log("Google token does not exist. ");
        }
    };
  
    const GoogleApiLogin = useGoogleLogin({
        onSuccess: tokenResponse => handleLoginSuccess(tokenResponse),
    });

    if (loginSuccess || googleLoginSuccess) {
        return <Navigate to={ReactEndPoint.TASK} replace={true} />
        
    } else {
        return (
            <div style={{ height: "100vh", backgroundColor: "#f2f2f2" }}>
                <Container className=' h-100'>
                    <Row className='h-100 justify-content-center align-items-center'>
                        <Col md={5}>
                            <Form onSubmit={onhandleSubmit} className=' mb-3 border border-secondary border-2 p-5 rounded'>
                                <h3 className='mb-4'>LOGIN</h3>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        onChange={onhandleChangeEmail}
                                        required
                                    />
                                    {loginError === 500 && <Alert variant="danger">Unable to Find active user</Alert>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="password"
                                        onChange={onhandleChangePassword}
                                
                                    />
                                    {loginError === 404 && <Alert variant="danger">Password does not exist</Alert>}
                                    {loginError === 422 && <Alert variant="danger">Password does not exist</Alert>}
                                </Form.Group>
                                <Button
                                    className='w-100 shadow  rounded'
                                    disabled={loginRequest}
                                    type="submit"
                                >
                                    {loginRequest ? 'Loading' : 'LOGIN'}
                                </Button>
                            
                                <div className=''>
                                    <div className='d-flex justify-content-end mt-3'>
                                        <Link to={ReactEndPoint.RESET_PASSWORD}>
                                            <p>Forgot Password?</p>
                                        </Link>
                                    </div>
                                    <div className='d-flex justify-content-center gap-2'>
                                        <p>Need an account?</p>
                                        <Link to={ReactEndPoint.SIGN_UP}>SIGN UP</Link>
                                    </div>
                                </div>
                             
                                <Button onClick={(e) => GoogleApiLogin()} className="w-100">
                                    Sign in with Google 🚀{' '}
                                </Button>
                                {googleLoginError === 500 &&
                                    <Alert variant="danger">
                                        User already exist in customer user.
                                    </Alert>
                                }
                                {/* <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />; */}
                            </Form>

                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }

};

export default Login;
