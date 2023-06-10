
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
        scheduleDate,
        scheduleTime,
        userId){
        let phoneConsentId = "";
        try {
            await db.transaction(async trx => {
                let consentData = await db(TABLE_USER_CONSENT_PHONE_NUMBER).insert({
                    phone_number: phoneNumber,
                    consent: consent,
                    country_code: countryCode,
                    created_at: new Date(),
                    user_id:userId
                }).returning('id');
                phoneConsentId = consentData[0]?.id;
                await trx(TABLE_SCHEDULES).insert({
                    user_consent_phone_number_id: phoneConsentId,
                    schedule_date: scheduleDate,
                    schedule_time: scheduleTime,
                    created_at: new Date()
                })
            })
        
           return true;
        } catch (error) {
            throw new APIError(
            'API Error', 
            STATUS_CODES.INTERNAL_ERROR, 
            `Unable to CreatePhoneNumberConsent`)
        }
    }
}
