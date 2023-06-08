import React,{useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

// import PhoneInput from 'react-phone-number-input'
const PhoneNumberModal = ({
    show,
    handleClose,
    title,
    bodyText,
    onhandleSubmit

}) => {
    const [value, setValue] = useState()
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
            >
                <Form className='border'>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={value}
                            onChange={setValue} />
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={onhandleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            
        </div>
    );
};

export default PhoneNumberModal;
