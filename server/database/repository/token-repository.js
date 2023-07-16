const {
    APIError,
    BadRequestError,
    STATUS_CODES,
} = require("../../utils/app-errors");
const db = require("../../config/index");
const logger = require("../../utils/error-handler")
const TimeConstant = require("../../constant/time-constant");
const { ApiRepositoryMessage } = require('../../constant/message');
const TOKENS = "tokens";
module.exports = class TokenRepository{
    constructor () {

    }
    async findCode(verficationCode) {
        logger.info(ApiRepositoryMessage('TokenRepository', "findCode"))
        try {
            let code =  await db(TOKENS).where('verfication_code', verficationCode).first();
            if(code){
                return code;
            }
            throw new Error("Unable to find verificationCode ")
        } catch (error) {
       
            if(error instanceof Error){
                throw new APIError('API Error', error.statusCode, error.message)
            }else{
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
        }
    }
    async createToken(verficationCode, userId){
        logger.info(ApiRepositoryMessage('TokenRepository', "createToken"))
        try {
            await db(TOKENS).insert({
                user_id: userId,
                verfication_code: verficationCode,
                expired_in: TimeConstant.getSixMinute()
            })
        } catch (error) {
          
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
           
        }
    }
    async deleteToken(id){
        logger.info(ApiRepositoryMessage('TokenRepository', "deleteToken"))
        await db(TOKENS).where('id', id).del();
    }
    async findToken(userId){
        logger.info(ApiRepositoryMessage('TokenRepository', "findToken"))
        try {
            let token = await db(TOKENS).where('user_id', userId).first();
            return token;
    
        } catch (error) {
            if (error instanceof Error) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
        }
    }
    async deleteCode(verficationCode) {
        logger.info(ApiRepositoryMessage('TokenRepository', "deleteCode"))
        try {
            let code =  await db(TOKENS).where('verfication_code', verficationCode).del();
            if(code) return code;
            throw new Error("Unable to delete verificationCode")
        } catch (error) {
            if (error instanceof Error) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
        }
    }
    async updateOtpWithExpiredTimeByUserId(userId, verificationCode) {
        logger.info(ApiRepositoryMessage('TokenRepository', "verificationCode"))
        // const timestamp = 1687652758445;
        // const date = new Date(timestamp);

        // const options = { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        // const lowellTime = date.toLocaleString('en-US', options);
        // console.log(Date.now());
        // console.log(lowellTime);
        try {
            const user = await db(TOKENS).where('user_id', userId)
                .update({ verfication_code: verificationCode, expired_in: TimeConstant.getSixMinute() })
            if (user) {
                return user
            }
            throw new Error("Unable to Update Verification code user")
        } catch (error) {
            if (error instanceof Error) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
        }
    }
}
