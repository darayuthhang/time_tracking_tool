import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Form, Container, Button, Alert, Row, Col } from 'react-bootstrap'
import { signup } from '../../redux/action/UserAction';
import { useSelector, dispatch, useDispatch } from 'react-redux';
// import { signup, sendNewLinkToVerifyUser, resetSignUpSuccess } from '../../redux/action/UserAction';
import ReactEndPoint from '../../constant/ReactEndPoint';
import Cookie from '../../uti/Cookie';
const Signup = () => {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const { signUpRequest, signUpSuccess, signUpError } = useSelector((state) => state.userSignUpReducers ) 
    // const { signUpInProgress, signUpSuccess, error, signUpEmail } = useSelector((state) => state.userSignUpReducers)
    // const { sendNewLinkProgress, sendNewLinkSuccess, sendLinkerror } = useSelector((state) => state.userSendNewLinkReducers)

    const onhandleChangeFirstName = (e) => {
        setFirstname(e.target.value)
        handleResetAllInputToDefault();
    }
    const onhandleChangeLastName = (e) => {
        setLastName(e.target.value)
        handleResetAllInputToDefault();
    }
    const onhandleChangeEmail = (e) => {
        setEmail(e.target.value)
        handleResetAllInputToDefault();
    }

    const onhandleChangePassword = (e) => {
        setPassword(e.target.value)
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
       
        if (e.target.value.length < 8 && e.target.value.length > 0) {
            setPasswordError('Password must be at least 8 characters');
        } else if (!regex.test(e.target.value) && e.target.value.length > 0){
            setPasswordError('Password must contain at least one letter and one number');
        } else {
            setPasswordError('');
        }
        //handleResetAllInputToDefault();
    }
    const handleResetAllInputToDefault = () => {
        // if (signUpSuccess === true || error !== null) dispatch(resetSignUpSuccess(false));
    }
    const onhandleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(firstName, lastName, email, password));
    }

    if(signUpSuccess){
        return(
            <Navigate to={ReactEndPoint.VERIFY_USER} replace={true} />
        )
    }else{
        return (
            <div>
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={5}>
                            <Form onSubmit={onhandleSubmit} className='border border-2 p-5 rounded'>
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
                                <div className='d-flex justify-content-center gap-3 mt-3'>
                                    <p>Already a user? </p>
                                    <Link to={ReactEndPoint.LOGIN}>LOGIN</Link>
                                </div>
                                {signUpError === 400 &&
                                   <Navigate to={ReactEndPoint.VERIFY_USER} replace={true}  />
                                }
                            </Form>

                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
   
};

export default Signup;
