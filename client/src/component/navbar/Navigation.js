import React, { useEffect } from 'react';
import {Navbar, 
    Nav,
     Button, 
     Spinner } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
import ReactEndPoint from '../../constant/ReactEndPoint';
import useStripePayment from '../../hooks/useStripePayment';
import styles from './navigation.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Cookie from '../../uti/Cookie';
import { removeAuth } from '../../redux/action/AuthAction';

import {
    useNavigate,
    Link,
    Navigate
} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useUnSubscribeModal } from '../../hooks/useNavigationModal';
import UnsubcribeModal from './UnsubcribeModal';
import { fetchAccountType } from '../../redux/action/UserAction';
import { resetUnsubscribeSuccess } from '../../redux/action/StripeAction';
const Navigation = ({
    // isAuth,
    // handleLogout,
    // navigate,
    // Link
  
}) => {
    const { isAuth } = useSelector((state) => state.authReducers)
    const [stripePayment, makePayment, loading, subscribeSuccess, setSubscribeSuccess] = useStripePayment('', false);
    const dispatch = useDispatch();
    const user = Cookie.getUser();
    const refreshToken = Cookie.getLocalRefreshToken();
    const {
        getAccountTypeData,
        getAccountTypeRequest,
        getAccountTypeSuccess,
        getAccountTypeError
    } = useSelector((state) => state.accountTypeReducers)
    const { 
        stripeUnsubscribeRequest, 
        stripeUnsubscribeSuccess,
        stripeUnsubscribeError } = useSelector((state) => state.stripeUnsubscribeReducers)
 
    const accountType = getAccountTypeData?.data?.account_type
    const navigate = useNavigate();
    const [
        handleUnSubscribeModalShow, 
        handleUnSubscribeModalClose,
        unSubscribeModalShow,
        handleUnsubcribe] = useUnSubscribeModal(false, user?.userId);
  
    useEffect(() => {
        if (user?.userId) {
            dispatch(fetchAccountType(user?.userId));
            if (subscribeSuccess) setSubscribeSuccess();
            if (stripeUnsubscribeSuccess) resetUnsubscribeSuccess();
        }
        return () => { }
    }, [stripeUnsubscribeSuccess, subscribeSuccess])
    
    const navigateToHomePage = () => {
        dispatch(removeAuth());
        window.location.reload()
    }

    // if (refreshToken) {
    //     var decoded = jwt_decode(refreshToken);
    //     //if token expire.
    //     if (decoded?.exp * 1000 < Date.now()) {
    //         //check the cookies from back-end
    //         Cookie.removeUser();
    //         navigateToHomePage();
    //     }
    // }

    const handleLogout = () => {
        navigate("/home")
        Cookie.removeUser();
        navigateToHomePage();
    }
    // const unsubscribePayment = () => {
    //     dispatch(unsubscribe(user?.userId))
    // }
    
    return (
        
        <Navbar expand="lg" className={`${styles['bg-color']}`}>
            <UnsubcribeModal 
                show={unSubscribeModalShow}
                handleClose={handleUnSubscribeModalClose}
                handleUnsubcribe={handleUnsubcribe}

            />
            {/* <Container className=''> */}
                <span style={{ fontSize: "16px" }} className='m-2'>&#9200;</span>  
                {isAuth ? 
                    <Navbar.Brand
                        // href={ReactEndPoint.HOME}
                        to={ReactEndPoint.TASK}
                        as={Link}
                        // href="#home"
                        className={`${styles['text-hover']} text-dark fw-bold`}
                    >
                        Taskkru
                    </Navbar.Brand>
                :
                    <Navbar.Brand
                        // href={ReactEndPoint.HOME}
                        to={ReactEndPoint.HOME}
                        as={Link}
                        // href="#home"
                        className={`${styles['text-hover']} text-dark fw-bold`}
                    >
                        Taskkru
                    </Navbar.Brand>
                }
              
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="text-center ">
                        {!isAuth &&
                            <Nav.Link
                                className={`${styles['text-hover']} text-dark fw-medium`}
                                as={Link}
                                to={ReactEndPoint.SIGN_UP}
                                // href={ReactEndPoint.SIGN_UP}
                            >   Sigup
                            </Nav.Link >
                        }
                    </Nav>
                    {isAuth ?
                        <Nav className='ms-auto text-center'>
                            {accountType === 'pro' ?
                                <Button
                                    onClick={handleUnSubscribeModalShow}
                                    variant='success'
                                    className={`text-white fw-medium ${styles['fixed-size-button']}`}

                                >
                                    {getAccountTypeRequest ?
                                        <Spinner animation="border" size="sm" />
                                        :
                                        <div>
                                        {stripeUnsubscribeRequest ?
                                            <Spinner animation="border" size="sm" />
                                            :
                                            "Unsubcribe"
                                        }
                                        </div>
                                      
                                    }
                                </Button>
                                :
                                <Button
                                    onClick={makePayment}
                                    variant='dark'
                                    className={`text-white fw-medium ${styles['fixed-size-button']}`}

                                >
                                    {loading ?
                                        <Spinner animation="border" size="sm" />
                                        :
                                        "Upgrade to pro"
                                    }
                                </Button>
                            }
                            <Nav.Link
                                className={`${styles['text-hover']} text-dark fw-medium`}
                                onClick={handleLogout}
                            >
                                Logout
                            </Nav.Link >    
                        </Nav>
                            :
                        <Nav className='ms-auto'>
                                <Nav.Link
                                    as={Link}
                                    to={ReactEndPoint.LOGIN}
                                    className='text-dark btn btn-outline-secondary fw-medium'
                                    
                                >
                                    Login
                                </Nav.Link > 
                        </Nav>

                        }
                </Navbar.Collapse>
            {/* </Container> */}
        </Navbar>
    );
};

export default Navigation;
