import React, {useState} from 'react';

import {
    Row,Col,Nav, Container, Modal, InputGroup, Form,
    Button, Tab
} from 'react-bootstrap';
import TaskTableList from '../../component/table/TaskTableList';
import './task.css';
import styles from './task.module.css';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import { createProject } from '../../redux/action/ProjectAction';
const Task = () => {
    
    const [showProject, setShowProject] = useState(false);
    const [project, setProject] = useState("");
    const [projectError, setProjectError] = useState(false);
    const [projectDescription, setProjectDescription] = useState("");
    const dispatch = useDispatch();

    const onhandleAddProject = (e) => {
        if(!project) {
            setProjectError(true);
            return
        };
        // dispatch(createProject())
        //where we add project
        setShowProject(false);
    }
    const onhandleCloseAddProject = (e) => {
        setShowProject(false)
        resetProjectToEmpty();
    }
    const onhandleShowAddProject = (e) => {
        setShowProject(true);
        resetProjectToEmpty();
    }
    const onhandleChangeProject = (e) => {
        setProject(e.target.value)
        resetErrorStateToDefault();
    }
    const onhandleChangeProjectDescription = (e) => {
        setProjectDescription(e.target.value)
        resetErrorStateToDefault();
    }
    const resetErrorStateToDefault = () =>{
        if (projectError) setProjectError(false)
    }
    const resetProjectToEmpty = () => {
        if (project) setProject("");
        if (projectDescription) setProjectDescription("");
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
                                            onClick={onhandleShowAddProject}
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
                        <div className="mb-3">
                            <label className='fw-bold'>Name</label>
                            <InputGroup size="sm" >
                                <Form.Control
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={onhandleChangeProject}
                                />
                                
                            </InputGroup>
                            {projectError && <div className='text-danger'>Project cannot be empty.</div>}
                        </div>
                        <div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label className='fw-bold'>Description</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3}
                                    onChange={onhandleChangeProjectDescription} 
                                />
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
                            onClick={onhandleAddProject}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Tab.Container>
      
        </div>
    );
};

export default Task;
