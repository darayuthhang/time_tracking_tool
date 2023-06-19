require('dotenv').config();

const { FormatScheduleDate, FormatTask, FormatPhoneNumber } = require("./index");
const TwilioService = require("../services/twilio-service");

const cron = require('node-cron');
const { ConsentRepository } = require("../database/repository/index");

module.exports = class ScheduleUtil {
    constructor() {
        this.twilioService = new TwilioService();
        this.consentRepository = new ConsentRepository();
    }
    async sendScheduleThroughPhone(
        scheduleDateAndTime, 
        timeZone,
        taskTosend,
        phoneNumber,
        scheduleId) {
        try {
            let scheduleTask = null;
            const croScheduleDateTime = FormatScheduleDate(scheduleDateAndTime);
            /**
             * @description
             *  59   21     14              6       * (wildcard task can execute anytime)
             *  min  hour   day of month    month   day of the week
          */
            scheduleTask = cron.schedule(croScheduleDateTime, async () => {
                await this.twilioService.sendOutBoundText(taskTosend, phoneNumber)
                //update is sent to true to validate schedule has sent
                await this.consentRepository.updateIsSent(scheduleId, true);
                scheduleTask.stop();
              
               
            }, {
                scheduled: true,
                timezone: timeZone
            });
            scheduleTask.start();
            return true;
        } catch (error) {
            console.error(error);
            return false
        }
    }
    async configCronjob(){
        /**
         * @Todo test it with the phone
         */
        try {
            let resData = await this.consentRepository.getPhoneConsentInfoPending()
            /**
             * [
                    |   {
                    |     schedule_date_time: 2023-06-17T18:54:00.000Z,
                    |     time_zone: 'America/New_York',
                    |     is_sent: false,
                    |     phone_number: '(978) 327-4651',
                    |     country_code: '1'
                    |   }
                ]   
             */
            if(resData.length > 0){
               for(let data of resData){
                   await this.sendScheduleThroughPhone(
                       data?.schedule_date_time,
                       data?.time_zone,
                       data?.task_to_send,
                       FormatPhoneNumber(data?.phoneNumber, data?.country_code),
                       data?.id
                   )
               }
            }

        } catch (error) {
            throw new Error(error);
        }
    }
}

