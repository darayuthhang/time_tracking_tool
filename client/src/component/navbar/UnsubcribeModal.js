import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const UnsubcribeModal = ({
    show,
    handleClose,
    handleUnsubcribe
}) => {
    const { stripeUnsubscribeRequest, stripeUnsubscribeError } = useSelector((state) => state.stripeUnsubscribeReducers)
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to unsubcribe?</Modal.Title>
            </Modal.Header>
            {stripeUnsubscribeError  && <div className='text-danger'>Error Occur</div>}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUnsubcribe}>
                        {stripeUnsubscribeRequest ? "Loading" : "Unsubcribe"}
                </Button> 
            </Modal.Footer>
            
        </Modal>

    );
};

export default UnsubcribeModal;
