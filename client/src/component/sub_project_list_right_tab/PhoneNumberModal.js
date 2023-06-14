import React,{useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Row, Col, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

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
    onhandleChangescheduleDateAndTime,
    onhandleChangeScheduleTime,
    scheduleDateAndTimeError,
    scheduleTimeError,
    onhandleChangeTimezone,
    timeZone,
    timeZoneError

}) => {
    const { createPhoneConsentRequest, createPhoneConsentSuccess } = useSelector((state) => state.createPhoneConsentReducers);
    const error = {
        phoneNumberMsg:"Please select country and enter valid phone number.",
        tickBoxMsg:"Please tick the box.",
        scheduleDateMsg:"Schedule date cannot be empty.",
        scheduleTimeMsg: "Schedule time cannot be empty.",
        timeZoneMsg:"Timezone cannot be empty"
    }
    const timeZoneIdList = [
        "America/New_York",
        "America/Chicago",
        "America/Denver",
        "America/Phoenix",
        "America/Los_Angeles",
        "America/Anchorage",
        "Pacific/Honolulu"
    ]
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
                            defaultCountry="US"
                            onChange={onChangePhoneNumber} />
                        {phoneNumberError && <div className='text-danger'>{error.phoneNumberMsg}</div>}   
                        <div className=' w-100 d-flex flex-wrap justify-content-center'>
                            <div className='w-100 mb-2 mt-2'>
                                <InputGroup className="w-100">
                                    <InputGroup.Text id="basic-addon1">Schedule</InputGroup.Text>
                                    <Form.Control
                                        type="datetime-local"
                                        onChange={onhandleChangescheduleDateAndTime}
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                {scheduleDateAndTimeError && <div className='text-danger'>{error.scheduleDateMsg}</div>}
                            </div>
                            <div className='w-100'>
                                <Dropdown  onSelect={(eventKey, event) => onhandleChangeTimezone(eventKey, event)} className="ms-1 ">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100 ">
                                        {timeZone === '' ? "Timezone" : timeZone}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100 border">
                                        {timeZoneIdList.map((val, index) => <Dropdown.Item eventKey={val}>{val}</Dropdown.Item>)}
                                      
                                      
                                    </Dropdown.Menu>
                                </Dropdown>
                            {timeZoneError && <div className='text-danger'>{error.timeZoneMsg}</div>}
                            </div>
                        </div>
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
                            variant="primary">
                            {createPhoneConsentRequest ? "Loading" :"Submit"}
                            </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            
        </div>
    );
};

export default PhoneNumberModal;
