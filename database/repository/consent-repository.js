
const { APIError,
    BadRequestError,
    STATUS_CODES, } = require('../../utils/app-errors');
const db = require("../../config/index");
const { TABLE_USER_CONSENT_PHONE_NUMBER, TABLE_SCHEDULES } = require("../table-name");
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
    async createPhoneNumberConsent(
        phoneNumber,
        consent,
        countryCode,
        scheduleDateAndTime,
        timeZone,
        taskTosend,
        userId){
        let phoneConsentId = "";
        let scheduleId = null;
        try {
            await db.transaction(async trx => {
                let consentData = await trx(TABLE_USER_CONSENT_PHONE_NUMBER).insert({
                    phone_number: phoneNumber,
                    consent: consent,
                    country_code: countryCode,
                    created_at: new Date(),
                    user_id:userId
                }).returning('id');
                phoneConsentId = consentData[0]?.id;
                let scheduelData = await trx(TABLE_SCHEDULES).insert({
                    user_consent_phone_number_id: phoneConsentId,
                    schedule_date_time: scheduleDateAndTime,
                    time_zone: timeZone,
                    task_to_send: taskTosend,
                    created_at: new Date()
                }).returning("id")
                scheduleId = scheduelData[0]?.id;
            })
            return scheduleId;
        } catch (error) {
            throw new APIError(
            'API Error', 
            STATUS_CODES.INTERNAL_ERROR, 
            `Unable to CreatePhoneNumberConsent`)
        }
    }
    async getPhoneConsentInfoPending(){
        try {
            //scheduleDateAndTime, timeZone, phoneNumbe, countrycode
            let data = await db(TABLE_USER_CONSENT_PHONE_NUMBER)
                .join(TABLE_SCHEDULES, `${TABLE_SCHEDULES}.user_consent_phone_number_id`, '=', `${TABLE_USER_CONSENT_PHONE_NUMBER}.id`)
                .where(`${TABLE_SCHEDULES}.is_sent`, false)
                .select(`${TABLE_SCHEDULES}.schedule_date_time`, 
                `${TABLE_SCHEDULES}.time_zone`, 
                `${TABLE_SCHEDULES}.id`, 
                `${TABLE_SCHEDULES}.is_sent`,
                `${TABLE_SCHEDULES}.task_to_send`,
                `${TABLE_USER_CONSENT_PHONE_NUMBER}.phone_number`,
                `${TABLE_USER_CONSENT_PHONE_NUMBER}.country_code`
            )
            return data;
        } catch (error) {
            throw new APIError(
                'API Error',
                STATUS_CODES.INTERNAL_ERROR,
                `Unable to getPhoneConsentInfoPending`)
        }
    }
    async updateIsSent(scheduleId, isSent){
        try {
            return await db(TABLE_SCHEDULES)
                .update({ is_sent: isSent })
                .where({
                    id: scheduleId
                })
        } catch (error) {
            throw new APIError(
                'API Error',
                STATUS_CODES.INTERNAL_ERROR,
                `Unable to updateIsSent`)
        }
    }
}
