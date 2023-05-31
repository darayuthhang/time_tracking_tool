import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import React, {useState} from 'react';
function CustomToggle({ children, eventKey }) {
    const [arrow, setArrow] = useState(false);
    const decoratedOnClick = useAccordionButton(eventKey, () =>{
        if (arrow) {setArrow(false)} else {setArrow(true)};
    });
  
    return (
        <div className='d-flex' onClick={decoratedOnClick}>
            <div
                className='text-light bg dark'
            >
                {children}
            </div>
            <div className='ms-auto text-light'>
                <i class={`bi bi-arrow-${arrow ? "up":"down"}`}></i>
            </div>
        </div>
     
    );
}
export default CustomToggle;
