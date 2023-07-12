import React, { useState, useEffect } from 'react';
import {
    Container,
    Card,
    Button,
    Col,
    Row,
    Badge,
    Alert,
    Accordion
} from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux';
import { 
    deleteProject, 
    resetStateProjectDeleteSuccess, 
    resetStateProjectUpdateError, 
    resetStateProjectUpdateSucess,
     updateProject } from '../../redux/action/ProjectAction';
import { formatDate, getLastUpdateAgo } from '../../uti/index'
import ProjectListRightTabModal from './ProjectListRightTabModal';
import { projectList } from '../../redux/action/ProjectAction';
import styles from './project_list.module.css';
import DeleteProjectModal from './DeleteProjectModal';
import CustomToggle from './CustomToggle';

const ProjectListRightTab = ({
    onSelectActiveTab,
    userId
}
) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectId, setProjectId] = useState("");
    const { projectUpdateSuccess, projectUpdateError } = useSelector((state) => state.projectUpdateReducers);
    const { projectDeleteSuccess } = useSelector((state) => state.projectDeleteReducers);
    const { projectListData } = useSelector((state) => state.projectListReducers)
    /**
     * @Redux dispatch
     */
    const dispatch = useDispatch();
    /**
     * @Useffect
     */
    useEffect(() => {
        //reset state of udpate success
        if(projectUpdateSuccess){
            //reset the state of it 
            dispatch(resetStateProjectUpdateSucess(false));
        }
        if (projectDeleteSuccess) dispatch(resetStateProjectDeleteSuccess(false));
        dispatch(projectList(userId));
        return () => {
        }
    }, [projectUpdateSuccess, projectDeleteSuccess])
    
    /**
     * @Description 
     *  - @Modal update project
     */
    const onhandleUpdateProject = () => {
        dispatch(updateProject(userId, projectId, projectName, projectDescription))
        setShowUpdateModal(false);//close modal
    }
    const onShowUpdateProjectModal = (e, projectId, projectName, projectDescription) => {
        e.stopPropagation();
        setProjectName(projectName);
        setProjectDescription(projectDescription);
        setProjectId(projectId)
        setShowUpdateModal(true);
    }
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false)
    };
    /**
     * @description
     *  - @Modal delete project
     */
    const onhandleDeleteProject = () => {
        setShowDeleteModal(false);
        dispatch(deleteProject(userId, projectId))
    }
    const onShowDeleteProjectModal = (e, projectId, projectName) => {
        e.stopPropagation();
        setShowDeleteModal(true);
        setProjectName(projectName);
        setProjectId(projectId)
    }
    const onhandleCloseDeleteProjectModal = () => {
        setShowDeleteModal(false)
    }
    const onhandleChangeProjectDescription = (e) => {
        resetProjectErrorToDefault();
        setProjectDescription(e.target.value);
    }
    const onhandleChangeProject = (e) => {
        resetProjectErrorToDefault();
        setProjectName(e.target.value); 
    }
    const resetProjectErrorToDefault = () => {
        if(projectUpdateError) dispatch(resetStateProjectUpdateError(null));
    }
    return (
        <div className='p-5'>
            {showUpdateModal &&
                <ProjectListRightTabModal
                    show={showUpdateModal}
                    handleClose={handleCloseUpdateModal}
                    onhandleChangeProjectDescription={onhandleChangeProjectDescription}
                    onhandleChangeProject={onhandleChangeProject}
                    title="UpdateProject"
                    onhandleUpdateProject={onhandleUpdateProject}
                    projectName={projectName}
                    projectDescription={projectDescription}
                    lockProjectButton={projectName}
                />
            }
            {showDeleteModal && 
                <DeleteProjectModal 
                    title={`Delete this project ${projectName}?`}
                    show={showDeleteModal}
                    onhandleDeleteProject={onhandleDeleteProject}
                    handleClose={onhandleCloseDeleteProjectModal}
                />
            }
            <Container className=''>
                <h5 className='fw-bold'>Projects</h5>
                <Row className='mt-5'>
                    {projectListData?.length > 0 &&
                        projectListData.map((val, index) =>
                            <Col
                                className={`${styles['fixed-height-col']} mb-5`}
                                key={val?.id}  
                                md={3} onClick={() => onSelectActiveTab(val?.id)}>
                                <Card
                                    bg="dark"
                                    className={`shadow ${styles["card"]} `}
                                    style={{ width: '18rem' }} >
                                    <Card.Body>
                                        <div className='d-flex mb-2 mt-2'>
                                            <Card.Title className='fw-bold text-light'>{val?.project_name}</Card.Title>
                                        </div>
                                        <Card.Header className='fw-bold' onClick={(e) => e.stopPropagation()}>
                                            <Accordion >
                                                <Card.Header>
                                                    <CustomToggle eventKey="0">Description
                                                    </CustomToggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body className='text-light '>
                                                        <div className={`${styles['t1']}`}>
                                                            <div className={`${styles['t2']}`}> {val?.project_description}</div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                           </Accordion>
                                        </Card.Header>
                                        <Card.Text className={`ms-auto ${styles['last-update']} text-secondary `}>
                                            Last updated {getLastUpdateAgo(val?.updated_at)}
                                        </Card.Text>
                                        <div className={`  ${styles['date-format']} `}>
                                            <Badge bg="dark"> {formatDate(val?.created_at)}</Badge>
                                        </div>
                                        <div className='d-flex gap-2 align-items-center justify-content-end'>
                                            <i 
                                                className={` ${styles['trash']} bi bi-trash `}
                                                onClick={(e) => onShowDeleteProjectModal(e, val?.id, val?.project_name)}
                                            ></i>
                                            <i
                                                className={` ${styles['pencil']} bi bi-pencil`}
                                                onClick={(e) => onShowUpdateProjectModal(e, val?.id, val?.project_name, val?.project_description)}
                                            ></i>
                                        </div>
                                    </Card.Body>
                                </Card>
                           
                            </Col>
                        )
                    }
                </Row>

            </Container>
        </div>

    );
};
export default ProjectListRightTab;

// const MemoizedProjectListRightTab = React.memo(ProjectListRightTab);
// export default MemoizedProjectListRightTab;
