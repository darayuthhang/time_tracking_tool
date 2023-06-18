//because import from index js it will circule the depency 
// run cosent service, and twilio service
// prevent circula depecy consent service ---> twilio--service ---> consent--service

const { ConsentRepository } = require("../database/repository/index");
const { FormatTask, FormatScheduleDate } = require("../utils/index");
const ScheduleUtil = require("../utils/schedule-util");


const {APIError} = require("../utils/app-errors");
module.exports = class ConsentService {
    constructor(){
        this.consentRepository = new ConsentRepository();
        this.scheduleUtil = new ScheduleUtil();
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
            let taskTosend = FormatTask(JSON.parse(task));
            let scheduleId = await this.consentRepository.createPhoneNumberConsent(
                phoneNumber,
                consent,
                countryCode,
                scheduleDateAndTime,
                timeZone,
                taskTosend,
                userId);
            return this.scheduleUtil.sendScheduleThroughPhone(scheduleDateAndTime, timeZone, taskTosend, phoneNumber, scheduleId)
        } catch (error) {
            throw new APIError('Data Not found', error)           
        }
    }
}
/**
 * 
 * 2023-06-14 19:41
 */
