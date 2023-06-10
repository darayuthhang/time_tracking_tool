import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const DeleteProjectModal = ({
    show,
    handleClose,
    title,
    onhandleDeleteProject,
  

}) => {
    const {projectDeleteRequest, projectDeleteError } = useSelector((state) => state.projectDeleteReducers);
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
            >
                <Modal.Header closeButton>
                    <div className='d-flex flex-column'>
                        <Modal.Title>{title}</Modal.Title>
                        {projectDeleteError && 
                            <div className='text-danger mt-2'>
                                <div>Sorry, we couldn't delete the project at the moment.</div>
                                <div> Please try again later. </div>
                            </div>
                        }
                    </div>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={onhandleDeleteProject}>
                        {projectDeleteRequest ?
                            "Loading"
                            :
                            "Delete"
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteProjectModal;
