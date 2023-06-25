import React, { useEffect } from 'react';
import { Container, 
    Navbar, 
    Nav,
     NavDropdown, 
     Button, 
     Spinner, Row, Col } from 'react-bootstrap';
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
const Navigation = ({
    // isAuth,
    // handleLogout,
    // navigate,
    // Link
  
}) => {
    const { user, isAuth } = useSelector((state) => state.authReducers)
    const [stripePayment, makePayment, loading] = useStripePayment('', false);
    const dispatch = useDispatch();
    const refreshToken = Cookie.getLocalRefreshToken();
    const navigate = useNavigate();
    
    const navigateToHomePage = () => {
        dispatch(removeAuth());
        window.location.reload()
    }
  
    if (refreshToken) {
      
        var decoded = jwt_decode(refreshToken);
        //if token expire.
        if (decoded?.exp * 1000 < Date.now()) {
            //check the cookies from back-end
            Cookie.removeUser();
            navigateToHomePage();
          
        }
    }

    const handleLogout = () => {
        navigate("/home")
        Cookie.removeUser();
        navigateToHomePage();
    }
 
    return (
        
        <Navbar expand="lg" className={`${styles['bg-color']}`}>
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
                        {/* {!isAuth &&
                            <Nav.Link
                                className={`${styles['text-hover']} text-dark fw-medium`}
                             
                                as={Link}
                                // to={ReactEndPoint.SIGN_UP}

                            >   Pricing
                            </Nav.Link >
                        } */}
                    </Nav>
                    {isAuth ?
                        <Nav className='ms-auto text-center'>
                            <Button
                                onClick={makePayment}
                                variant='dark'
                                className={`text-white fw-medium ${styles['fixed-size-button']}`}
                           
                                >
                                {loading ?
                                    <Spinner animation="border" size="sm" />
                                :
                                    "Upgrade to pro"}
                            </Button>

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
