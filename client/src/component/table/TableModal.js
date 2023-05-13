import React from 'react';
import {Modal, Button} from 'react-bootstrap';
const TableModal = ({
    show,
    handleClose,
    title,
    bodyText,
    onhandleDeleteTask

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
                {/* <Modal.Body>
                    {bodyText}
                </Modal.Body> */}
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onhandleDeleteTask}>Delete</Button>
                </Modal.Footer>
            </Modal> 
        </div>
    );
};

export default TableModal;
