
import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Form, Container, Button, Alert, Row, Col, Stack } from 'react-bootstrap'
import { login, resetLoginError, googleLogin, resetGoogleLoginError } from '../../redux/action/UserAction';
import { useSelector, dispatch, useDispatch } from 'react-redux';
// import { signup, sendNewLinkToVerifyUser, resetloginSuccess } from '../../redux/action/UserAction';
import ReactEndPoint from '../../constant/ReactEndPoint';
// import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
// import { GoogleLogin } from '@react-oauth/google';;
import { 
    useGoogleOneTapLogin, 
    useGoogleLogin,
    GoogleLogin } from '@react-oauth/google';




const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const { loginRequest, loginSuccess, loginError } = useSelector((state) => state.userLoginReducers)
    const { googleLoginError, googleLoginSuccess } = useSelector((state) => state.googleUserLoginReducers)
    // const { handleGoogle, loading, error } = useFetch(
    //     "http://localhost:5152/signup"
    // );
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
        // console.log(response);
        console.log("GOOGLE TOKEN");
        console.log(googleTokenExist);
        if (googleTokenExist) {
            dispatch(googleLogin(googleTokenExist))
        } else {
            console.log("Google token does not exist. ");
        }
    };
  

    const login = useGoogleLogin({
        onSuccess: tokenResponse => handleLoginSuccess(tokenResponse),
    });

    if (loginSuccess || googleLoginSuccess) {
        return (
            <Navigate to={ReactEndPoint.TASK} replace={true} />
        )
    } else {
        return (
            <div>
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={5}>
                            <Form onSubmit={onhandleSubmit} className='border border-2 p-5 rounded'>
                                <h3 className='mb-4'>LOGIN</h3>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        onChange={onhandleChangeEmail}
                                        required
                                    />
                                    {loginError === 500 && <Alert variant="danger">Email already exist</Alert>}
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
                             
                                <Button onClick={() => login()} className="w-100">
                                    Sign in with Google 🚀{' '}
                                </Button>
                                {googleLoginError === 500 && <Alert variant="danger">
                                        User already exist in custom user.
                                </Alert>}
                            </Form>

                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }

};

export default Login;
