
const {FormatData} = require('../utils/index');
const { ConsentRepository } = require("../database/repository/index");
const {APIError} = require("../utils/app-errors");
module.exports = class ConsentService {
    constructor(){
        this.consentRepository = new ConsentRepository();
    }
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
    async createPhoneNumberConsent({phoneNumber, consent, countryCode}) {
        try {
            /**
             * @Todo 
             *  send to api service
             */
            let data = await this.consentRepository.createPhoneNumberConsent(phoneNumber, consent, countryCode);
            return data;
        } catch (error) {
           
            throw new APIError('Data Not found', error)           
        }
    }
}
