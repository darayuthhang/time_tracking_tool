import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ReactEndPoint from '../../constant/ReactEndPoint';
import styles from './navigation.module.css';
const Navigation = ({
    isAuth,
    handleLogout
  
}) => {
    return (
        <Navbar expand="lg" className={`${styles['bg-color']}`}>
            <Container className=''>
                <span style={{ fontSize: "16px" }} className='m-2'>&#9200;</span>   
                <Navbar.Brand
                    to={ReactEndPoint.HOME}
                    as={Link}
                    href="#home" 
                    className={`${styles['text-hover']} text-dark`}
                    >
                    TaskMaster
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="text-center ">
                        {!isAuth &&
                            <Nav.Link
                                className={`${styles['text-hover']} text-dark`}
                                as={Link}
                                to={ReactEndPoint.SIGN_UP}

                            >   Sigup
                            </Nav.Link >
                        }
                        {!isAuth &&
                            <Nav.Link
                                className={`${styles['text-hover']} text-dark`}
                                as={Link}
                                to={ReactEndPoint.SIGN_UP}

                            >   Pricing
                            </Nav.Link >
                        }
                    </Nav>
                    {isAuth ?
                        <Nav className='ms-auto'>
                                <Button variant='dark fs-6'
                                    className={`text-white`}
                                >
                                    Upgrade to pro
                                </Button>
                                <Nav.Link
                                    className={`${styles['text-hover']} text-dark`}
                                    as={Link}
                                    to={ReactEndPoint.HOME}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Nav.Link >
                        </Nav>
                            :
                        <Nav className='ms-auto'>
                            <Nav.Link
                                className='text-dark btn btn-outline-secondary'
                                as={Link}
                                to={ReactEndPoint.LOGIN}
                            >
                                Login
                            </Nav.Link >
                        </Nav>

                        }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
