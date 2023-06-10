import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const ProjectListRightTabModal = ({
    show,
    handleClose,
    title,
    bodyText,
    onhandleUpdateProject,
    onhandleChangeProjectDescription,
    onhandleChangeProject,
    projectName,
    projectDescription,
    lockProjectButton

}) => {
    const { 
        projectUpdateRequest,
        projectUpdateError } = useSelector((state) => state.projectUpdateReducers);
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <div className="mb-3 h-100">
                        <label className='fw-bold'>Name</label>
                        <InputGroup size="sm" >
                            <Form.Control
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={projectName}
                                onChange={onhandleChangeProject}
                            />
                        </InputGroup>
                        {/* {projectError && <div className='text-danger'>Project cannot be empty.</div>} */}
                    </div>
                    <div>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className='fw-bold'>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={projectDescription}
                                onChange={onhandleChangeProjectDescription}
                            />
                        </Form.Group>
                        {projectUpdateError &&
                            <div className='text-danger'>
                                Sorry, we couldn't update the project at the moment. Please try again later.
                            </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button 
                        variant="primary"
                        disabled={!lockProjectButton}
                         onClick={onhandleUpdateProject}>
                        {projectUpdateRequest ?
                            "Loading"
                        :
                            "Update"
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProjectListRightTabModal;
