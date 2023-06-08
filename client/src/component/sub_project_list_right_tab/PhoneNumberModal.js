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
    onhandleSubmit,
    phoneValue,
    onChangePhoneNumber,
    setPhoneNumber

}) => {
    const [value, setValue] = useState()
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
            >
                <Form className='border' onSubmit={onhandleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex flex-column justify-content-center'>
                            <PhoneInput
                      
                                placeholder="Enter phone number"
                                value={phoneValue}
                                onChange={onChangePhoneNumber} />
                            
                            <Form.Group className="mb-3 d-flex justify-content-center mt-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="I consent to providing my phone number" />
                            </Form.Group>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            
        </div>
    );
};

export default PhoneNumberModal;
