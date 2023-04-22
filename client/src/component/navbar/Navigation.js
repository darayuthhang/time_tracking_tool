import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
const Navigation = () => {
    const isAuth = "";
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">TimeTracking App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        {isAuth ? 
                        <Nav.Link href="#link">Logout</Nav.Link>
                        :
                        <Nav.Link href="#link">Login</Nav.Link>
                    }
                      
                        {/* <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Upgrade to Pro
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
