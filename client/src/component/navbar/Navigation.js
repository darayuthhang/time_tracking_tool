import React, { useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
import ReactEndPoint from '../../constant/ReactEndPoint';
import styles from './navigation.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import Cookie from '../../uti/Cookie';
import { removeAuth } from '../../redux/action/AuthAction';
import {
    useNavigate,
    Link
} from 'react-router-dom';
import jwt_decode from "jwt-decode";
const Navigation = ({
    // isAuth,
    // handleLogout,
    // navigate,
    // Link
  
}) => {

    
    const { user, isAuth } = useSelector((state) => state.authReducers)
    const dispatch = useDispatch();
    const refreshToken = Cookie.getLocalRefreshToken();
    const navigate = useNavigate();
    

    const navigateToHomePage = () => {
        dispatch(removeAuth());
        window.location.reload()
    }
  

    
    if (refreshToken) {
        console.log('refreshToken');
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
            <Container className=''>
                <span style={{ fontSize: "16px" }} className='m-2'>&#9200;</span>  
                {isAuth ? 
                    <Navbar.Brand
                        // href={ReactEndPoint.HOME}
                        to={ReactEndPoint.TASK}
                        as={Link}
                        // href="#home"
                        className={`${styles['text-hover']} text-dark fw-bold`}
                    >
                        TaskMaster
                    </Navbar.Brand>
                :
                    <Navbar.Brand
                        // href={ReactEndPoint.HOME}
                        to={ReactEndPoint.HOME}
                        as={Link}
                        // href="#home"
                        className={`${styles['text-hover']} text-dark fw-bold`}
                    >
                        TaskMaster
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
                        {!isAuth &&
                            <Nav.Link
                                className={`${styles['text-hover']} text-dark fw-medium`}
                                // href={ReactEndPoint.SIGN_UP}
                                as={Link}
                                to={ReactEndPoint.SIGN_UP}

                            >   Pricing
                            </Nav.Link >
                        }
                    </Nav>
                    {isAuth ?
                        <Nav className='ms-auto'>
                                <Button variant='dark'
                                className={`text-white fw-medium`}
                                >
                                    Upgrade to pro
                                </Button>
                           
                                <Nav.Link
                                    className={`${styles['text-hover']} text-dark fw-medium`}
                                    // href={ReactEndPoint.HOME}
                                    // as={Link}
                                    // to={ReactEndPoint.HOME}
                                    // to="/"
                                    // href=""
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Nav.Link >
                               
                             
                        </Nav>
                            :
                        <Nav className='ms-auto'>
                            <LinkContainer to={ReactEndPoint.LOGIN}>
                                <Nav.Link
                                    // href={ReactEndPoint.LOGIN}

                                  
                                  

                                    // onClick={handleLoginClick}
                                    className='text-dark btn btn-outline-secondary fw-medium'
                                    
                                >
                                    Login
                                </Nav.Link >
                            </LinkContainer>
                            
                        </Nav>

                        }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
