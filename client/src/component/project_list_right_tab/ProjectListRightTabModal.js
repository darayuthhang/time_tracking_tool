import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
const ProjectListRightTabModal = ({
    show,
    handleClose,
    title,
    bodyText,
    onhandleUpdateProject,
    onhandleChangeProjectDescription,
    onhandleChangeProject

}) => {
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
            // backdrop="static"
            // // keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
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
                        {/* {projectError && <div className='text-danger'>Project cannot be empty.</div>} */}
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
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onhandleUpdateProject}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProjectListRightTabModal;
