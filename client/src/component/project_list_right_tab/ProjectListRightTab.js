import React, {useState} from 'react';
import {Container, 
    Card, 
    Button, 
    Col, 
    Row,
    Badge} from 'react-bootstrap'

import { formatDate, getLastUpdateAgo } from '../../uti/index'
import ProjectListRightTabModal from './ProjectListRightTabModal';
import styles from './project_list.module.css';
const ProjectListRightTab = ({ 
    onSelectActiveTab,
    projectListData
}
) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    
    /**
     * @Description 
     *  - @Modal update project
     */
    const onhandleUpdateProject = () => {
        setShowUpdateModal(true);
    }
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false)
    };
    return (
        <div className='p-5'>
            {showUpdateModal && 
                <ProjectListRightTabModal
                    show={showUpdateModal}
                    handleClose={handleCloseUpdateModal}
                    title="UpdateProject"
                    // title={tasksIds.length === 1 ? `Delete this task?` : "Delete these tasks?"}
                    bodyText="hello "
                    onhandleUpdateProject={onhandleUpdateProject}
                />
            }
           
            <Container className=''>
                <h5 className='fw-bold  '>Projects</h5>
                <Row className='mt-5'>
                        {projectListData.length > 0 &&
                            projectListData.map((val, index) =>
                            <Col md={3}>
                                    <Card className={`mb-3 ${styles["card-bg"]}`} style={{ width: '18rem' }} >
                                        <Card.Header className={`${styles['']}`}>
                                        <div className='d-flex'>
                                            <Card.Title className='fw-bold'>
                                                {val?.project_name}
                                            </Card.Title>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                            <Card.Text className='fw-bold'>
                                                <textarea
                                                    readOnly
                                                    rows="1"
                                                    value={val?.project_description}
                                                    id="floatingTextarea">
                                                </textarea>
                                         
                                            </Card.Text>
                                            <Card.Text className={`ms-auto ${styles['last-update']} text-secondary `}>
                                                Last updated {getLastUpdateAgo(val?.updated_at)}
                                            </Card.Text>
                                            <div className={` ${styles['date-format']} `}>
                                                <Badge bg="primary"> {formatDate(val?.created_at)}</Badge>
                                            </div>
                                            <div className='d-flex gap-2 align-items-center justify-content-end'>
                                                <i className={`${styles['trash']} bi bi-trash`}></i>
                                                <i 
                                                    className={`${styles['pencil']} bi bi-pencil`}
                                                    onClick={onhandleUpdateProject}
                                                ></i>
                                            </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            )
                        }
                </Row>
               
              
                {/* <ul className={`${styles['ul']} d-flex flex-column gap-2`}>
                    {projectListData.length > 0 &&
                        projectListData.map((val, index) => 
                            <li className='d-flex '>
                                <div
                                    className={` w-100  ${styles['bullet-project-container']} d-flex fw-bold p-3 `}
                                    onClick={() => onSelectActiveTab(val?.id)}>
                                    <div className=''>&#8226;</div>
                                    <div className='ms-3'>{val?.project_name}</div>
                                </div>
                                <div className='ms-auto d-flex gap-2 align-items-center'>
                                    <i className={`${styles['trash']} bi bi-trash`}></i>
                                    <i className={`${styles['pencil']} bi bi-pencil`}></i>
                                </div>
                                
                            </li>
                           
                        ) 
                    }
                </ul> */}
              
            </Container>
        </div>
       
    );
};

export default ProjectListRightTab;
