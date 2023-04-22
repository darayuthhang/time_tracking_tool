const {
    APIError,
    BadRequestError,
    STATUS_CODES,
} = require("../../utils/app-errors");
const db = require("../../config/index");
const logger = require("../../utils/error-handler")
const { ApiRepositoryMessage } = require('../../constant/message');
const TOKENS = "tokens";
module.exports = class TokenRepository{
    constructor () {
        this._24HOUR = 24 * 3600 * 1000;
        this._10SECOND = 10000
        this.time = Date.now() + this._24HOUR // an hour
    }
    async findCode(verficationCode) {
        logger.debug(ApiRepositoryMessage('TokenRepository', "findCode"))
        try {
            let code =  await db(TOKENS).where('verfication_code', verficationCode).first();
            if(code){
                return code;
            }
            throw new Error("Unable to find verificationCode ")
        } catch (error) {
            // logger.debug(error.message)
            logger.debug(error);
            if(error instanceof Error){
                throw new APIError('API Error', error.statusCode, error.message)
            }else{
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
        }
    }
    async createToken(verficationCode, userId){
        logger.debug(ApiRepositoryMessage('TokenRepository', "createToken"))
        try {
            await db(TOKENS).insert({
                user_id: userId,
                verfication_code: verficationCode,
                expired_in: this.time
            })
        } catch (error) {
            logger.debug(error);
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
           
        }
    }
    async deleteToken(id){
        logger.debug(ApiRepositoryMessage('TokenRepository', "deleteToken"))
        await db(TOKENS).where('id', id).del();
    }
    async findToken(userId){
        logger.debug(ApiRepositoryMessage('TokenRepository', "findToken"))
        try {
            let token = await db(TOKENS).where('user_id', userId).first();
            return token;
    
        } catch (error) {
            // logger.debug(error.message)
            logger.debug(error);
            if (error instanceof Error) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
        }
    }
    async deleteCode(verficationCode) {
        logger.debug(ApiRepositoryMessage('TokenRepository', "deleteCode"))
        try {
            let code =  await db(TOKENS).where('verfication_code', verficationCode).del();
            if(code) return code;
            throw new Error("Unable to delete verificationCode")
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof Error) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
        }
    }
    async updateOtpWithExpiredTimeByUserId(userId, verificationCode) {
        logger.debug(ApiRepositoryMessage('TokenRepository', "verificationCode"))
        try {
            const user = await db(TOKENS).where('user_id', userId)
                .update({ verfication_code: verificationCode, expired_in: this.time })
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
