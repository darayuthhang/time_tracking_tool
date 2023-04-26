require('dotenv').config();
const apiVersion = require("../constant/api_version");
const {ApiRouteMessage} = require("../constant/message")
const {UserService}  = require("../services/index");
const logger = require("../utils/error-handler");
const { 
    resentOtpLimiter, 
    resentPasswordLimiter,
    updatePasswordLimiter,
    accessTokenLimitter } = require("./middleware/rate-limit");

const { 
    validationUserDataRules, 
    validateUserData, 
    validationVerificationCodeRules,
    validationResentOtpCodeRules,
    validationUserLoginDataRules,
    validationResentPasswordCodeRules,
    validationUserPasswordDataRules } = require('./middleware/validator');

const {
    GenerateAcessToken,
    VerifyToken} = require('../utils/index');


module.exports = (app) => {
    const { API_VERSION } = apiVersion;
    const userService = new UserService(); 

    /**
     * POST:  /api/v1/user/login
     * POST:  /api/v1/user/verify
     * POST:  /api/v1/user/signup
     * POST:  /api/v1/user/resent-otp-code
     * POST:  /api/v1/user/google-login
     * POST:  /api/v1/user/reset-password
     * put:   /api/v1/user/update-password
     */

    app.post(`${API_VERSION}/user/signup`, validationUserDataRules(), validateUserData, async(req, res, next) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/user/signup`, "POST"))
        try {
            let userId = await userService.createUser(req.body);
            return res.status(200).json({ success: true, data:{userId} });
        } catch (error) {
            logger.debug(error.message)
            return res.status(error?.statusCode).json({ success: false, message: error.message })
            // next(error)
        }
       
    })

    app.post(`${API_VERSION}/user/verify`, validationVerificationCodeRules(), validateUserData, async (req, res, next) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/user/verify`, "POST"))
        try {
            // await userService.createUser(req.body);
            await userService.verifyUser(req.body);
            return res.status(200).json({ success: true });
        } catch (error) {
            logger.debug(error.message)
            return res.status(error?.statusCode).json({ success: false, message: error.message })
        }
        
    })

    app.post(`${API_VERSION}/user/resent-otp-code`, resentOtpLimiter, validationResentOtpCodeRules(), validateUserData, async (req, res, next) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/user/resent-otp-code`, "POST"))
        try {
            await userService.resentVerificationCode(req.body);
            return res.status(200).json({ success: true });
        } catch (error) {
            logger.debug(error.message)
            return res.status(error?.statusCode).json({ success: false, message: error.message })
        }
        
    })

    app.post(`${API_VERSION}/user/login`, validationUserLoginDataRules(), validateUserData, async (req, res, next) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/user/login`, "POST"))
        try {
            let userData = await userService.login(req.body);
            //let userId = await userService.createUser(req.body);
            return res.status(200).json({ success: true, data: userData });
        } catch (error) {
            logger.debug(error.message)
            return res.status(error?.statusCode).json({ success: false, message: error.message })
            // next(error)
        }

    })

    app.post(`${API_VERSION}/user/google-login`, async(req, res) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/user/google-login`, "POST"))
        try {
            let user = await userService.googleLogin(req.body);
            return res.status(200).json({ success: true, data: user });
        } catch (error) {
            logger.debug(error.message)
            return res.status(error?.statusCode).json({ success: false, message: error.message })
        }
    })


    app.post(`${API_VERSION}/user/reset-password`, resentPasswordLimiter, validationResentPasswordCodeRules(), validateUserData, async (req, res) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/user/reset-password`, "POST"))
        try {
            await userService.resetPassword(req.body);
            return res.status(200).json({ success: true});
        } catch (error) {
            logger.debug(error.message)
            return res.status(error?.statusCode).json({ success: false, message: error.message })
        }
    })

    app.put(`${API_VERSION}/user/update-password`, validationUserPasswordDataRules(), validateUserData, async (req, res) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/user/update-password`, "POST"))
        try {
            await userService.updatePassword(req.body);
            return res.status(200).json({ success: true });
        } catch (error) {
            logger.debug(error.message)
            return res.status(error?.statusCode).json({ success: false, message: error.message })
        }
    })

    app.post(`${API_VERSION}/user/auth/token`, accessTokenLimitter, async (req, res) => {
        logger.debug(ApiRouteMessage(`${API_VERSION}/user/auth/token`, "POST"))
        const refreshToken = req.body.refreshToken;
        if (refreshToken == null) return res.sendStatus(401);
        const { REFRESH_TOKEN_SECRET } = process.env;
        try {
            const user = await VerifyToken(refreshToken, REFRESH_TOKEN_SECRET)
            const accessToken = await GenerateAcessToken({ userId: user?.id })
            return res.status(200).json({ success: true, accessToken: accessToken })
        } catch (error) {
            logger.debug(error.message)
        }
        return res.status(404).json({ success: false, message: "Nothing is found." })
    })



   
    
}
