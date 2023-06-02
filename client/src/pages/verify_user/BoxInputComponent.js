import React from 'react';

const BoxInputComponent = ({
    onhandleChange,
    value,
    refInput
}) => {
    return (
        <input
            type="text"
            ref={refInput}
            maxlength="1" 
            className="form-control text-center shadow-none  fs-3 p-1"
            onChange={onhandleChange}
            // value={value}
            placeholder=""

        />
    );
};

export default BoxInputComponent;
