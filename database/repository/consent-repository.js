
const { APIError,
    BadRequestError,
    STATUS_CODES, } = require('../../utils/app-errors');
const db = require("../../config/index");
const { TABLE_USER_CONSENT_PHONE_NUMBER } = require("../table-name");
module.exports = class ConsentRepository{
    /**
     * @Todo 
     * accept phone number
     * consent 
     * {
     *  phoneNumber: string
     *  consent: boolean
     *  created_at: new Date()
     * }
     */
    async createPhoneNumberConsent(phoneNumber, consent, countryCode){
        try {
            let consentData = await db("").insert({
                phone_number:phoneNumber,
                consent: consent,
                country_code:countryCode,
                created_at: new Date()
            });;
            return consentData;
        } catch (error) {
            throw new APIError(
            'API Error', 
            STATUS_CODES.INTERNAL_ERROR, 
            `Unable to CreatePhoneNumberConsent`)
        }
    }
}
