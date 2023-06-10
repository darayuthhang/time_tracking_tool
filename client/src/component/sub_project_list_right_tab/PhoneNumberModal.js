import React,{useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Row, Col, InputGroup } from 'react-bootstrap';
import { defaultDate } from '../../uti';

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
    phoneNumberCheckedError,
    onhandleChangeScheduleDate,
    onhandleChangeScheduleTime,
    scheduleDateError,
    scheduleTimeError
}) => {

    const error = {
        phoneNumberMsg:"Please select country and enter valid phone number.",
        tickBoxMsg:"Please tick the box.",
        scheduleDateMsg:"Schedule date cannot be empty.",
        scheduleTimeMsg: "Schedule time cannot be empty."
    }
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
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={phoneValue}
                            onChange={onChangePhoneNumber} />
                        {phoneNumberError && <div className='text-danger'>{error.phoneNumberMsg}</div>}   
                        <div className='mb-2 mt-2'>
                            <InputGroup className="">
                                <InputGroup.Text id="basic-addon1">Schedule date</InputGroup.Text>
                                <Form.Control
                                    type="date"
                                    min={defaultDate()} max="2023-12-31"
                                    onChange={onhandleChangeScheduleDate}
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {scheduleDateError && <div className='text-danger'>{error.scheduleDateMsg}</div>}
                        </div>
                        <InputGroup className="">
                            <InputGroup.Text id="basic-addon1">Schedule time</InputGroup.Text>
                            <Form.Control
                                type="time"
                                onChange={onhandleChangeScheduleTime}
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        {scheduleTimeError && <div className='text-danger'>{error.scheduleTimeMsg}</div>}
                        <Form.Group className=" d-flex justify-content-center" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                onChange={onhandleChangeCheckPhoneNumber}
                                label="I hereby consent to providing my phone number for the purpose of sending text messages related to my tasks on Taskkru App. I understand that these messages will be sent exclusively for task-related communication, such as task updates, reminders, and important notifications. I acknowledge that standard messaging rates may apply. I have read and understood the privacy policy, and I am voluntarily providing my phone number for this purpose." />
                        </Form.Group>
                        {phoneNumberCheckedError && <div className='text-danger'>{error.tickBoxMsg}</div>}
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
