import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactEndPoint from '../../constant/ReactEndPoint';
import axios from '../../axios/Axios';
import BackEndPoint from '../../constant/BackEndPoint';
import { logError, logSuccess } from '../../uti/error-handle';
import { Button, Alert } from 'react-bootstrap';

const ResetPassword = () => {
    const [email ,setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailRequest, setEmailRequest] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState("");
    const navigate = useNavigate();

    const apiPostMethod = async () => {
        setEmailRequest(true);
        try {   
            let response = await axios.post(BackEndPoint.RESET_PASSWORD, {email});
            logSuccess(response);
            setEmailRequest(false);
            setEmailSuccess("Plese check your email for the link to reset password .")
            //navigate(ReactEndPoint.UPDATE_PASSWORD);
            //redirect
        } catch (error) {
            logError(error, error.message);
            if (error?.response?.status === 500) setEmailError("Email does not exist .")
            setEmailRequest(false);
        }
    }
    const onhandleSubmitEmail = (e) => {
        e.preventDefault();
        if (email) apiPostMethod();
    }
    const onhandleChangeEmail = (e) => {
        setEmail(e.target.value)
        if(emailError) setEmailError('')
        if(emailSuccess) setEmailSuccess('')
    }
    return (
        <div className="container">
            <h1 className="text-center my-4">Reset Password</h1>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <form onSubmit={onhandleSubmitEmail}>
                        <div className="form-group">
                            <label for="email">Email address:</label>
                            <input 
                            type="email" 
                            className="form-control" 
                            onChange={onhandleChangeEmail}
                            id="email" 
                            placeholder="Enter email" required />
                            {emailError && <Alert variant='danger'>Email does not exist</Alert>}
                        </div>
                        <Button
                            className='mt-3 w-100 shadow  rounded'
                            disabled={emailRequest}
                            type="submit"
                        >
                            {emailRequest ? 'Loading' : 'Reset password'}
                        </Button>
                        {emailSuccess && <Alert variant='danger'>{emailSuccess}</Alert>}
                    </form>
                    <div className='mt-3 d-flex gap-2 justify-content-center'>
                        <p>Don't have an account?</p>
                        <Link to={ReactEndPoint.SIGN_UP}>Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword; 
