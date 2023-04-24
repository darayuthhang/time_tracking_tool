import React from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import styles from './left_table.module.css'

import './left_tab.css';
const LeftTab = () => {
    return (
        <Tab.Container id="left-tabs-example" >
            <Row className="left-tab-container">
                <Col  md={2}>
                    <Nav variant="pills" className="flex-column fs-5 fw-medium" >
                        <Nav.Item >
                            <Nav.Link eventKey="first" style={{ color: 'black' }} className='lh-base fw-bold'>
                               <div className='d-flex gap-3'>
                                    <i className="bi bi-airplane-engines"></i>
                                    <div>Projects</div>
                                    <div className={`ms-auto ${styles.plus_sign}`}>+</div>
                               </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Nav.Link eventKey="second" style={{ color: 'black' }} className='lh-base'>
                                Projects
                            </Nav.Link>
                        </Nav.Item>
                  
                    </Nav>
                </Col>
                <Col  md={10} >
                    <Container className='border border-primary ml-3'>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                hello
                                {/* <Sonnet /> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {/* <Sonnet /> */}
                            </Tab.Pane>
                        </Tab.Content>
                    </Container>
              
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default LeftTab;
