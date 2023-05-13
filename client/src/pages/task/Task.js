import React, {useState, useEffect} from 'react';

import {
    Row,Col,Nav, Container, Modal, InputGroup, Form,
    Button, Tab, Breadcrumb
} from 'react-bootstrap';
import TaskTableList from '../../component/table/TaskTableList';
import './task.css';
import styles from './task.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { createProject, resetStateCreateSuccess } from '../../redux/action/ProjectAction';
import Cookie from '../../uti/Cookie';
import { projectList } from '../../redux/action/ProjectAction';

const Task = () => {
    
    const [showProject, setShowProject] = useState(false);
    const [projectName, setprojectName] = useState("");
    const [projectError, setProjectError] = useState(false);
    const [projectDescription, setProjectDescription] = useState("");
    //const [activeTab, setActiveTab] = useState("");
    const [projectId, setProjectId] = useState("");
    const dispatch = useDispatch();
    //const {user} = useSelector((state) => state.authReducers);
    const user = Cookie.getUser();
    const { projectRequest, projectSuccess } = useSelector((state) => state.projectReducers);
    const { projectListData } = useSelector((state) => state.projectListReducers)
    
    useEffect(() => {
        if(projectSuccess){
            dispatch(resetStateCreateSuccess());
        }
        dispatch(projectList(user?.userId));
      return () => {
        
      }
    }, [projectSuccess])

    
    /**
     * 
     * @Description onhandleAddProject() is handle sending post request to back-end.
     */
    const onhandleAddProject = (e) => {
        if (!projectName) {
            setProjectError(true);
            return
        };
        dispatch(createProject({ projectName, projectDescription }, user?.userId))
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
        setprojectName(e.target.value)
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
        if (projectName) setprojectName("");
        if (projectDescription) setProjectDescription("");
    }
    const onSelectActiveTab = (key) => {
        setProjectId(key);
    }
    return (
        <div>
            <Tab.Container id="left-tabs-example" onSelect={(selectedKey) => onSelectActiveTab(selectedKey)}>
                <Row className={` `}>
                    <Col  md={2} className={`border left-tab-container ${styles.side_bar} `}>
                        <Nav variant="pills" className="flex-column" >
                            <Nav.Item >
                                <Nav.Link eventKey="first" style={{ color: 'black' }} className=''>
                                    <div className='d-flex gap-4'>
                                        <i className="bi bi-airplane-engines"></i>
                                        
                                        <div className={`mt-2 ${styles.side_bar_font_size}`}>Projects</div>
                                        <div
                                            onClick={onhandleShowAddProject}
                                            className={`ms-auto ${styles.plus_sign}`}>
                                            +</div>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                            {projectListData.length > 0 && 
                                projectListData.map((val, index) => 
                                    <Nav.Item key={val?.id}  >
                                        <Nav.Link 
                                             eventKey={val?.id} style={{ color: 'black' }} 
                                            className={`${styles.side_bar_font_size}`}
                                            // className= {`lh-base ${styles["font-size-heading-side-bar"]}`}
                                             >
                                            {val?.project_name}
                                        </Nav.Link>
                                    </Nav.Item>
                                )
                            }
                        </Nav>
                    </Col>
                    <Col md={10} className={`right-tab-container ${styles.right_tab_bar}`}>
                        <Container className=' mt-5 ml-3'>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">First tab content</Tab.Pane>
                                {projectListData.length > 0 &&
                                    projectListData.map((val, index) =>
                                        <Tab.Pane key={val?.id} eventKey={val?.id}>
                                            <TaskTableList 
                                                projectNameHeading={val?.project_name}
                                                projectId={projectId}
                                            />
                                        </Tab.Pane>
                                    )
                                }
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
                            disabled={projectRequest}
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
