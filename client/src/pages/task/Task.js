import React, {useState, useEffect} from 'react';

import {
    Row,Col,Nav, Container, Modal, InputGroup, Form,
    Button, Tab, Breadcrumb
} from 'react-bootstrap';

import './task.css';
import styles from './task.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { createProject, resetStateCreateSuccess } from '../../redux/action/ProjectAction';
import Cookie from '../../uti/Cookie';
import { projectList } from '../../redux/action/ProjectAction';
import ProjectListRightTab from '../../component/project_list_right_tab/ProjectListRightTab';
//import MemoizedTaskTableList from '../../component/sub_project_list_right_tab/TaskTableList';
// import MemoizedProjectListRightTab from '../../component/project_list_right_tab/ProjectListRightTab';
import TaskTableList from '../../component/sub_project_list_right_tab/TaskTableList';


const Task = () => {
    
    const [showProject, setShowProject] = useState(false);
    const [projectName, setprojectName] = useState("");
    const [projectError, setProjectError] = useState(false);
    const [projectDescription, setProjectDescription] = useState("");
    const [projectId, setProjectId] = useState("first"); //this projectTab iD
  

    const dispatch = useDispatch();

    //const {user} = useSelector((state) => state.authReducers);
    const user = Cookie.getUser();
    const { projectRequest, projectSuccess } = useSelector((state) => state.projectReducers);
    const { projectListData } = useSelector((state) => state.projectListReducers)
    let accountType = "";
    // i forget i use redux, i can share state to another component.
    if (projectListData.length > 0) accountType = projectListData[0]?.account_type;
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
    /**
     * 
     * @Description onhandleShowAddProject
     */
    const onhandleShowAddProject = (e) => {
        /**
         * @this we need 
         */
        const LENGTH_PROJECTS = 7;
        if (projectListData.length === LENGTH_PROJECTS){
            alert("Please upgrade to pro");
            return;
        }
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
        <div 
        style={{height: "100vh"}} 
        className={`${styles['bg-color']}`}>
            <Tab.Container 
                id="left-tabs-example" 
                className=""
                onSelect={(selectedKey) => onSelectActiveTab(selectedKey)}
                activeKey={projectId}
            >
                <Row className={`h-100`} >
                    <Col md={2} className={`  left-tab-container ${styles["side_bar"]}`}>
                        <Nav variant="pills" className="flex-column" >
                            <Nav.Item >
                                <Nav.Link eventKey="first" style={{ color: 'black' }} className=''>
                                    <div className='d-flex'>
                                        <div className={`mt-1 ${styles.side_bar_font_size}`}>Projects</div>
                                        <div
                                            onClick={onhandleShowAddProject}
                                            className={`ms-auto ${styles.plus_sign}`}>
                                            +
                                        </div>
                                    </div>
                                </Nav.Link>
                            </Nav.Item >
                            {projectListData.length > 0 && 
                                projectListData.map((val, index) => 
                                    <Nav.Item  
                                        key={val?.id}  >
                                        <Nav.Link 
                                            // eventKey="second"
                                            eventKey={val?.id.toString()} 
                                            style={{ color: 'black' }} 
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
                    <Col 
                        md={10} 
                        className={` overflow-auto right-tab-container ${styles.right_tab_bar} h-100`}>
                        <Tab.Content className=''>
                            <Tab.Pane className='' eventKey="first">
                                    {/* <MemoizedProjectListRightTab 
                                        onSelectActiveTab={onSelectActiveTab}
                                        userId={user?.userId}
                                    />   */}
                                 <ProjectListRightTab
                                        onSelectActiveTab={onSelectActiveTab}
                                        userId={user?.userId}
                                    />   
                                    
                                </Tab.Pane>
                                {projectListData.length > 0 &&
                                    projectListData.map((val, index) =>
                                        <Tab.Pane 
                                            className=" "
                                            key={val?.id} 
                                            eventKey={val?.id.toString()} 
                                     
                                            // className="h-100"
                                        >
                                            {/* <MemoizedTaskTableList 
                                                projectNameHeading={val?.project_name}
                                                projectId={projectId}
                                                userId={user?.userId}
                                            /> */}
                                            <TaskTableList
                                                projectNameHeading={val?.project_name}
                                                projectId={projectId}
                                                userId={user?.userId}
                                            />
                                        </Tab.Pane>
                                    )
                                }
                            </Tab.Content>
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
