require('dotenv').config();
module.exports = class TwilioService {
    constructor() {
        const accountSid = process.env.TWILIO_ACCOUNT_ID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        this.client = require("twilio")(accountSid, authToken);
        this.VIRUAL_NUMBER = "+18668414553"
    }
    async sendOutBoundText(bodyText, outBoundPhoneNumber) {
        try {
            let message = await this.client.messages
                .create({ body: bodyText, from: this.VIRUAL_NUMBER, to: outBoundPhoneNumber })
            return true;
        } catch (error) {
            return false;
            console.log(error);
        }
    }
}


