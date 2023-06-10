//because import from index js it will circule the depency 
// run cosent service, and twilio service
// prevent circula depecy consent service ---> twilio--service ---> consent--service
const TwilioService = require("../services/twilio-service");
const { ConsentRepository } = require("../database/repository/index");

const {APIError} = require("../utils/app-errors");
module.exports = class ConsentService {
    constructor(){
        this.consentRepository = new ConsentRepository();
        // this.twilioService = new TwilioService();
        this.twilioService = new TwilioService();
    }
    /**
     * @Todo 
     * accept phone number
     * consent 
     * {
     *  phoneNumber: string
     *  consent: booleans
     *  created_at: new Date()
     * }
     */
    async createPhoneNumberConsent({
        phoneNumber, 
        consent,
        countryCode}) {
        try {
            console.log(phoneNumber, consent, countryCode);
            /**
             * @Todo 
             * - front-end sent post with phone number and consent,
             *  countrycode, and schdueldate
             * - handle the overlap when two user set the samd ate
             * - we need to store schdedule date 
             * 
            *  Schedule Overlaps: If you have many schedules that run frequently or overlap with each other,
            *  it can lead to performance issues and potential conflicts.
            * Consider the intervals and timings of your schedules to avoid excessive
             */
            // let data = await this.consentRepository.createPhoneNumberConsent(phoneNumber, consent, countryCode);
            /**
             * @description 
             *  - bodytext - text
             *  - outBoundPhoneNumber - phone number
             */
            const task = "hello success"    
            // let formatPhoneNumber = "+" + countryCode + phoneNumber;
            // this.twilioService.sendOutBoundText(task, formatPhoneNumber)
            return data;
        } catch (error) {
           
            throw new APIError('Data Not found', error)           
        }
    }
}
