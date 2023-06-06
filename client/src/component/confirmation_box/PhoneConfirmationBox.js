import React, { useState } from 'react';

const PhoneConfirmationBox
 = () => {
    const [consentChecked, setConsentChecked] = useState(false);

    const handleConsentChange = () => {
        setConsentChecked(!consentChecked);
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={handleConsentChange}
                />
                I agree to provide my phone number.
            </label>
            <button disabled={!consentChecked}>Submit</button>
        </div>
    );
};

export default PhoneConfirmationBox
;
