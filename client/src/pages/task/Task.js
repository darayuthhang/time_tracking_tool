import React, {useState} from 'react';

import {
    Row,Col,Nav, Container, Modal, InputGroup, Form,
    Button, Tab
} from 'react-bootstrap';
import TaskTableList from '../../component/table/TaskTableList';
import './task.css';
import styles from './task.module.css';
const Task = () => {
    
    const [showProject, setShowProject] = useState(false);

    const onhandleAddProject = (e) => {
    
        setShowProject(true);
    }
    const onhandleCloseAddProject = (e) => {
        setShowProject(false)
    }
    const onhandleShowAddProject = (e) => {
        setShowProject(false);
    }
    return (
        <div>
            <Tab.Container id="left-tabs-example" >
                <Row className="">
                    <Col md={2} className={`left-tab-container ${styles.side_bar} border`}>
                        <Nav variant="pills" className="flex-column fs-5 fw-medium" >
                            <Nav.Item >
                                <Nav.Link eventKey="first" style={{ color: 'black' }} className='lh-base fw-bold'>
                                    <div className='d-flex gap-4'>
                                        <i className="bi bi-airplane-engines"></i>
                                        <div>Projects</div>
                                        <div
                                            onClick={onhandleAddProject}
                                            className={`ms-auto ${styles.plus_sign}`}>
                                            +</div>
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
                    <Col md={10} className='right-tab-container'>
                        <Container className=' mt-5 ml-3'>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <TaskTableList />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    {/* <Sonnet /> */}
                                </Tab.Pane>
                            </Tab.Content>
                        </Container>

                    </Col>
                </Row>
                <Modal 
                    className='h-100'
                    show={showProject} 
                    onHide={onhandleCloseAddProject}>
                    <Modal.Header closeButton>
                        <Modal.Title>AddProject</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label className='fw-bold'>Name</label>
                            <InputGroup size="sm" className="mb-3">
                                <Form.Control
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label className='fw-bold'>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={onhandleCloseAddProject}>
                            Cancel
                        </Button>
                        <Button
                            className='fw-bold'
                            variant="primary"
                            onClick={onhandleCloseAddProject}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Tab.Container>
      
        </div>
    );
};

export default Task;
