import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactEndPoint from '../../constant/ReactEndPoint';
import axios from '../../axios/Axios';
import BackEndPoint from '../../constant/BackEndPoint';
import { logError, logSuccess } from '../../uti/error-handle';
import { Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const UpdatePassword = () => {
    const [updatePasswordError, setupdatePasswordError] = useState("");
    const [updatePasswordRequest, setupdatePasswordRequest] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);

    const param = useParams();
    const navigate = useNavigate();
    const token = param?.token;
  
    const apiPostMethod = async () => {
        if(!token) return;
        setupdatePasswordRequest(true);
        //set token to back-end
        // setupdatePasswordRequest(true);
        try {
            let response = await axios.put(
                BackEndPoint.UPDATE_PASSWORD, { token, password });
            logSuccess(response);
            setupdatePasswordRequest(false);
            navigate(ReactEndPoint.LOGIN);
            // navigate(ReactEndPoint.VERIFY_USER);
            //redirect
        } catch (error) {
            logError(error, error.message);
            if (error?.response?.status === 500) setupdatePasswordError("Email does not exist .")
            setupdatePasswordRequest(false);
        }
    }
    const onhandleSubmit = (e) => {
        e.preventDefault();
        if(confirmPassword === password) {
            apiPostMethod()
        }else{
            setPasswordNotMatch(true);
        }
    }
    const onhandleChangeNewPassword = (e) => {
        setPassword(e.target.value)
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (e.target.value.length < 8 && e.target.value.length > 0) {
            setPasswordError('Password must be at least 8 characters');
        } else if (!regex.test(e.target.value) && e.target.value.length > 0) {
            setPasswordError('Password must contain at least one letter and one number');
        } else {
            setPasswordError('');
        }
        resetStateToDefault();
    }
    const onhandleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        resetStateToDefault()
    }
    const resetStateToDefault = () => {
        if (updatePasswordError) setupdatePasswordError('');
        if (passwordNotMatch) setPasswordNotMatch(false);
        if (updatePasswordRequest) setupdatePasswordRequest(false);
    }
    return (
        <div className="container">
            <h1 className="text-center my-4">Update Password</h1>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <form onSubmit={onhandleSubmit}>
                        <div className="form-group">
                            <label for="email">New password:</label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={onhandleChangeNewPassword}
                                id="password"
                                placeholder="New password" required />
                            {passwordError && <Alert variant="danger">{passwordError}</Alert>}
                        </div>
                        <div className="form-group mt-3">
                            <label for="email">Confirm password:</label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={onhandleChangeConfirmPassword}
                                id="password"
                                placeholder="Confirm password" required />
                            {passwordNotMatch && <Alert variant='danger'>Password not match.</Alert>}
                        </div>
                        <Button
                            className='mt-3 w-100 shadow  rounded'
                            disabled={updatePasswordRequest}
                            type="submit"
                        >
                            {updatePasswordRequest ? 'Loading' : 'Update password'}
                        </Button>
                        {updatePasswordError && <Alert variant='danger'>Cannot Update password</Alert>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword; 
