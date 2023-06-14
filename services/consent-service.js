//because import from index js it will circule the depency 
// run cosent service, and twilio service
// prevent circula depecy consent service ---> twilio--service ---> consent--service
const TwilioService = require("../services/twilio-service");
const { ConsentRepository } = require("../database/repository/index");
const { FormatTask, FormatScheduleDate } = require("../utils/index");
const cron = require('node-cron');

const {APIError} = require("../utils/app-errors");
module.exports = class ConsentService {
    constructor(){
        this.consentRepository = new ConsentRepository();
        // this.twilioService = new TwilioService();
        this.twilioService = new TwilioService();
    }
    async createPhoneNumberConsent({
        phoneNumber, 
        consent,
        countryCode, 
        task,
        scheduleDateAndTime,
        timeZone}, 
        userId) {
        try {    
            let scheduleTask = null;
            let data = await this.consentRepository.createPhoneNumberConsent(
                phoneNumber,
                consent,
                countryCode,
                scheduleDateAndTime,
                timeZone,
                userId);
            const croScheduleDateTime = FormatScheduleDate(scheduleDateAndTime, timeZone);
            scheduleTask = cron.schedule(croScheduleDateTime, async () => {
                await this.twilioService.sendOutBoundText(FormatTask(JSON.parse(task)), phoneNumber)
                scheduleTask.stop();
            });
            scheduleTask.start();
            return data;
        } catch (error) {
            throw new APIError('Data Not found', error)           
        }
    }
}
/**
 * 
 * 2023-06-14 19:41
 */
