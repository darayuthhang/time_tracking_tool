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
    onhandleChangeCheckPhoneNumber,
    phoneNumberError,
    phoneNumberCheckedError
}) => {

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                className='d-flex align-items-center'
            >
                <Form className='' onSubmit={onhandleSubmit}>
                    <Modal.Body>
                        <div className='d-flex flex-column justify-content-center'>
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={phoneValue}
                                onChange={onChangePhoneNumber} />
                            {phoneNumberError && <div className='text-danger'>Please enter valid phone number.</div>}
                            <Form.Group className="mb-3 d-flex justify-content-center mt-3" controlId="formBasicCheckbox">
                                <Form.Check 
                                    type="checkbox" 
                                    onChange={onhandleChangeCheckPhoneNumber}
                                    label="I hereby consent to providing my phone number for the purpose of sending text messages related to my tasks on Taskkru App. I understand that these messages will be sent exclusively for task-related communication, such as task updates, reminders, and important notifications. I acknowledge that standard messaging rates may apply. I have read and understood the privacy policy, and I am voluntarily providing my phone number for this purpose." />
                            </Form.Group>
                            {phoneNumberCheckedError && <div className='text-danger'>Please tick the box.</div>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={handleClose}>
                            Close
                        </Button>
                        <Button 
                            type="submit"
                            variant="primary">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            
        </div>
    );
};

export default PhoneNumberModal;
