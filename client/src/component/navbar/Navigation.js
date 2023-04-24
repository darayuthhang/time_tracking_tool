import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ReactEndPoint from '../../constant/ReactEndPoint';

const Navigation = ({
    isAuth,
    handleLogout
  
}) => {
    return (
        <Navbar bg="light" expand="lg" className='mb-5'>
            <Container>
                <Navbar.Brand href="#home">TimeTracking App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link 
                            as={Link}
                            to={ReactEndPoint.HOME}
                        >
                            Home
                        </Nav.Link >
                        {isAuth ? 
                          <Nav.Link 
                           
                            onClick={handleLogout}
                           
                        >
                             LogOut
                        </Nav.Link >
                        
                        :
                        <Nav.Link
                            as={Link}
                            to={ReactEndPoint.LOGIN}
                         
                        >   Login
                        </Nav.Link >
                    }
                   
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
