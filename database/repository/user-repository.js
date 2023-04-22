
const {
    APIError,
    BadRequestError,
    STATUS_CODES,
} = require("../../utils/app-errors");
const db = require("../../config/index");
const logger = require("../../utils/error-handler")
const { ApiRepositoryMessage } = require('../../constant/message');


const TABLE_USERS = "users";
const TABLE_TOKENS = "tokens";
module.exports = class UserRespository {
    constructor() {
        this._24HOUR = 24 * 3600 * 1000;
        this._10SECOND = 10000
        this.time = Date.now() + this._24HOUR // an hour
    }
    async createUserTrx(email, firstName, lastName, password, verificationcode) {
        logger.debug(ApiRepositoryMessage('UserRespository', "createUserTrx"))
        let id = "";
        try {
            await db.transaction(async trx => {
                const person = await trx(TABLE_USERS).insert({
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    password: password,
                    auth_method: "email",
                }).returning('id');
                id = person[0]?.id;
                await trx(TABLE_TOKENS).insert({
                    user_id: person[0]?.id,
                    verfication_code: verificationcode,
                    expired_in: this.time
                })
            })
            return id;
        } catch (error) {
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Create User"
            );
        }
    }
    async findUserByValidationAndEmail(email, isActive) {
        try {
            let user = await db(TABLE_USERS).where({
                email: email,
                validated: isActive,
                auth_method: "email"
            }).first();
            return user;
            // throw new Error("Unable to Find active user")
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
        }
    }
    async findUserByemail(email) {
        try {
            const user = await db(TABLE_USERS).where(
                {
                    email: email,
                    auth_method: "email",
                }
            ).first();
            if (user) {
                return user;
            }
            throw new Error("Unable to Find user by email")
        } catch (error) {
            if (error instanceof Error) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
        }

    }
    async updateActiveUser(userId, isActive) {
        try {
            const user = await db(TABLE_USERS).where('id', userId).update({ validated: isActive, updated_at: new Date() })
            if (user) {
                return user
            }
            throw new Error("Unable to Update active user")
        } catch (error) {
            if (error instanceof Error) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
        }
    }
    async createGoogleUser({ googleId, email, firstName, lastName }) {
        try {
            let googleUser = []; 
            googleUser = await db(TABLE_USERS).insert({
                email: email,
                first_name: firstName,
                last_name: lastName,
                google_id: googleId,
                auth_method: "google_email"
            }).returning('id');
            if (googleUser.length === 0) throw new Error("Unable to Create google user");
            return googleUser;
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Unable to Create google user')
        }
    }
    async findGoogleUserByGoogleId(googleId, email) {
        try {
            const googleUser = await db(TABLE_USERS).where(
                {
                    email: email,
                    google_id: googleId,
                    auth_method: "google_email"
                }
            ).first();
            return googleUser;
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
        }
    }
    async updateActiveUserPassword(userId, password) {
        try {
            const user = await db(TABLE_USERS).where('id', userId).update({ password: password, updated_at: new Date()})
            if (user) {
                return user
            }
            throw new Error("Unable to Update password active user")
        } catch (error) {
            if (error instanceof Error) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
        }
    } 
    async findUserByCustomEmail(email) {
        try {
            const user = await db(TABLE_USERS).where(
                {
                    email: email,
                    auth_method: "email"
                }
            ).first();
            return user;
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
        }

    }

}
