
const { ApiServiceMessage } = require("../constant/message");
const { GetVerificationCode,
    GeneratePassword,
    GenerateSalt,
    isPassword,
    GenerateRefreshToken,
    GenerateAccessToken, 
    GetToken,
    FormatGoogleUser} = require("../utils/index");
const logger = require("../utils/error-handler")
const { APIError, STATUS_CODES } = require("../utils/app-errors");
const userEmail = require("../utils/userMailer");
const { OAuth2Client } = require('google-auth-library');
const { UserRepository, TokenRepository } = require("../database/repository/index"); // {UserResponsetory : require}  ===> Userespo1.userresponse(reuire) => new

module.exports = class UserService {
    constructor() {
        this.userService = "USER_SERVICE"
        this.userRepository = new UserRepository();
        this.tokenRepository = new TokenRepository();
        this.from = "WheelTracker"
        this.text = "success"
        this.email = "darayuthhang12@gmail.com"
        this.subject = ""
        this.typeEmail = ""
        if (process.env.NODE_ENV === 'local') {
            this.url = "http://localhost:3000"
        } else {
            this.url = ""
        }
    }
    async createUser({ email, firstName, lastName, password }) {
        logger.debug(ApiServiceMessage(this.userService, "createUser"))
        email = email.toLowerCase().trim();
        /**
         * status code 400 ==> Please activae your account
         * status code 404 ===> Email already exist
         * status code 500 ===> Create user not found.
         */
        try {
            const userActiveEmail = await this.userRepository.findUserByValidationAndEmail(email, false);
            if (userActiveEmail) { throw new APIError('API Error', STATUS_CODES.BAD_REQUEST, 'Please activate your account.') };
            const isEmail = await this.userRepository.findUserByValidationAndEmail(email, true);
            if (isEmail) { throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Email already exist.') };
            //hash password
            let hashPassword = await GeneratePassword(password, await GenerateSalt());
            let verificationCode = GetVerificationCode();
            //save in database
            let userId = await this.userRepository.createUserTrx(email, firstName, lastName, hashPassword, verificationCode)
            //send valdiation code to user
            await userEmail.sendEmail("yuth", "hello world", email, "hello world", verificationCode)
            return userId;
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, "Create user not found.")
            }

        }
    }
    async verifyUser({ verificationCode, email }) {
        logger.debug(ApiServiceMessage(this.userService, "verifyUser"))
        //email, and verificationcode
        /**
         * 404 Verificationcode expired
         * 500 verifcation code not match.
         */

        try {
            let userId = await this.userRepository.findUserByemail(email);
            const getCode = await this.tokenRepository.findCode(verificationCode);
            if (Date.now() >= getCode?.expired_in) throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid verificationCode or expired timestamp.')
            await this.userRepository.updateActiveUser(userId?.id, true)
            await this.tokenRepository.deleteCode(verificationCode)
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot verify User.')
            }

        }
    }
    async resentVerificationCode({ email }) {
        logger.debug(ApiServiceMessage(this.userService, "resentVerificationCode"))
        try {
            //use email to get user id from user table
            let user = await this.userRepository.findUserByemail(email);
            const userId = user?.id;
            // generate new code 
            const verificationCode = GetVerificationCode();
            await this.tokenRepository.updateOtpWithExpiredTimeByUserId(userId, verificationCode);
            await userEmail.sendEmail("yuth", "hello world", email, "hello world", verificationCode)
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot Update Verification Code.')
            }
        }
    }

    async login({ email, password }) {
        logger.debug(ApiServiceMessage(this.userService, "login"))
        /**
         * 404 password not found
         * 500 Email does not exist
         */
        try {
            //accept user email, and password
            let user = await this.userRepository.findUserByValidationAndEmail(email, true);
            if (!user) throw new Error("Unable to Find active user")
            /**
             * if we use await , we wait 
             * for a Promise to resolve 
             * before continuing with the execution of the function.
             * 
             * if we do not use await to call function, 
             *  will continue executing immediately 
             * without waiting for the Promise to resolve. 
             */
            await isPassword(password, user?.password)
            // console.log(boolean);
            //send refresh and access token
            const userObject = { userId: user?.id }
            const refreshToken = await GenerateRefreshToken(userObject);
            const accessToken = await GenerateAccessToken(userObject);
            
            const userData = {
                accessToken,
                refreshToken,
                userId: user?.id,
                firstName: user?.first_name,
                lastName: user?.last_name,
                email: user?.email,
                created_at: user?.created_at
            }
            return userData;
            // find email with validate user 
            // compare has password 
        } catch (error) {
            if (error instanceof Error) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find email')
            }
        }
    }
    async googleLogin({ googleToken }) {
        logger.debug(ApiServiceMessage(this.userService, "googleLogin"))
      
        //if google user exist, return true
        //else create google user
        let user = null, userData = {}, userObject = {};
 
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
           
            const payload = ticket.getPayload();
            const googleId = payload.sub; 
            /**
           * @Description if google email exist in customer user, 
           * tell user email already
           */
            let customUser = await this.userRepository.findUserByCustomEmail(payload?.email);
            if(customUser) throw Error("User already exist in custom user.")
            /**
             * @Description user re login with the exist google email
             *  do not create another google email.
             */
            user = await this.userRepository.findGoogleUserByGoogleId(googleId, payload?.email)
            if(user?.google_id){
                return await FormatGoogleUser(user?.google_id, googleId, user);
            }
            /**
             * @Description create new google email account
             */
            if(!customUser){
                user = await this.userRepository.createGoogleUser({
                    googleId,
                    email: payload?.email,
                    firstName: payload?.given_name,
                    lastName: payload?.family_name
                })
                userObject = { userId: user[0]?.id }
                /**
                 * @return data
                 */
                userData = {
                    accessToken: await GenerateAccessToken(userObject),
                    refreshToken: await GenerateRefreshToken(userObject),
                    userId: user[0]?.id,
                    firstName: user[0]?.first_name,
                    lastName: user[0]?.last_name,
                    email: user[0]?.email,
                    created_at: user[0]?.created_at
                }
                return userData
            }
            throw new Error("Unable to login with Google user");
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof Error) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Invalid link.')
            }
            // res.status(401).json({ success: false });
        }
    }
    async resetPassword({email}){
        logger.debug(ApiServiceMessage(this.userService, "resetPassword"))
        try {
            let user = await this.userRepository.findUserByValidationAndEmail(email, true);
            if (!user) throw new Error("Unable to Find active user")
            /**
             * @Delete previous token, so that users can request new token
             * when they click on reset new password.
             */
            if(user?.id) {
                let token = await this.tokenRepository.findToken(user?.id);
                if (token?.id) await this.tokenRepository.deleteToken(token?.id)
            };
            let resetToken = GetToken();
            /**
             * @Store resetToken in tokens table
             */
            await this.tokenRepository.createToken(resetToken, user?.id);
            this.subject = "Reset your Wheel Strategy tracker password."
            this.typeEmail = "resetPassword"
            this.text = `Someone (hopefully you) has requested a password reset for your WheelStrategyTracker account.`;
            const link = `${this.url}/update-password/${resetToken}`
            await userEmail.sendEmail(this.from, this.text, email,
                this.subject, link, this.typeEmail)
        } catch (error) {
            if (error instanceof Error) {
                throw new APIError('API Error', error?.statusCode, error?.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find email')
            }
        }
    }
    async updatePassword({token, password}){
        logger.debug(ApiServiceMessage(this.userService, "updatePassword"))
        //check if token exist
        // if it exist, hash password
        // update password in user table
        try {
            let code = await this.tokenRepository.findCode(token);
            let hashPassword = await GeneratePassword(password, await GenerateSalt());
            await this.userRepository.updateActiveUserPassword(code?.user_id, hashPassword);
        } catch (error) {
            logger.debug(error.message)
            if (error instanceof APIError) {
                throw new APIError('API Error', error.statusCode, error.message)
            } else {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, "Create user not found.")
            }
        }
    }
}
