require('dotenv').config();
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const { DateTime, Interval } = require("luxon");
const { APIError, STATUS_CODES } = require("./app-errors");
let _this = this;

module.exports.GetVerificationCode = () => {
    return crypto.randomBytes(3).toString('hex');
}
module.exports.GetToken =  () => {
    return crypto.randomBytes(32).toString("hex");
}
module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};
module.exports.isPassword = async (
    userLoginPassword,
    userSignUpPassword,
) => {
    let boolean =  await bcrypt.compare(userLoginPassword, userSignUpPassword)
    if (!boolean) throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Password not found')
    return boolean;
};

module.exports.GenerateAccessToken = async (payload) => {
    try {
        if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("Access Token Secret does not exist.")
        //20m
        return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
    } catch (error) {
        throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Access Token Secret does not exist.')
    }
};
module.exports.GenerateRefreshToken= async (payload) => {
    try {
        if(!process.env.REFRESH_TOKEN_SECRET) throw new Error("Refresh Token Secret does not exist.")
        //24h
        return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
    } catch (error) {
        throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Refresh Token Secret does not exist.')
    }
};
module.exports.FormatGoogleUser = async (dbGoogleId, googleId, user) => {
    let userData = {};
    if (dbGoogleId == googleId) {
        let userObject = { userId: user?.id}
        const accessToken = await _this.GenerateAccessToken(userObject);
        const refreshToken = await _this.GenerateRefreshToken(userObject);
        userData = {
            accessToken, 
            refreshToken,
            userId: user?.id,
            firstName: user?.first_name,
            lastName: user?.last_name,
            email: user?.email,
            updated_at: user?.created_at
        }
        return userData;
    }
    return userData;

}

module.exports.ValidateSignature = async (req) => {
    try {
        const signature = req.get("authorization");
        console.log(signature.split(" ")[1]);
        const payload = await jwt.verify(signature.split(" ")[1], process.env.ACCESS_TOKEN_SECRET);
        req.user = payload;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports.VerifyToken = async (incomingToken, secretToken) => {
    let user = await jwt.verify(incomingToken, secretToken)
    return user;
}

module.exports.isObjectEmpty = (objectName) => {
    return JSON.stringify(objectName) === "{}";
};

module.exports.getGoogleUserInfo = async (googleToken) => {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    try {   
        let userInfo = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${googleToken}`
            }
        })
        return userInfo?.data;
    } catch (error) {
        throw Error(error.message)
    }
}
module.exports.FormatTask = (input = []) => {
    let result = ""
    /**
     * 
     * [{"task_date":"06/10/2023",
     * "id":"f7b2770b-0232-4a63-9aa0-f769be1cfba0",
     * "task_name":"qwe","task_description":"qwe",
     * "task_status":"Progress",
     * task_description
     * "project_id":"9dd3e977-f1e0-4c6f-95d3-dd8f5911f1c4"}]
     */
    if(input.length > 0){
        for (let [index, data] of input.entries()) {
            const newString = `${index + 1}. Task:\nName: ${data?.task_name}\nDescription: ${data?.task_description}\nDate: ${data?.task_date}\nstatus: ${data?.task_status}\n`;
            result += newString;
        }
        return result + "To unsubscribe, reply with Stop .";
    }
    return input;
}


 //<minute> <hour> <day of the month> <month> <day of the week>
module.exports.FormatScheduleDate = (scheduleDateTime) => {
  
        const zoneUTC = { zone: 'utc' }
        let minutes = "", hours = "", dayOfMonth = "", month = "";
        //const targetTimestamp = DateTime.fromJSDate(scheduleDateTime);
   
        const targetTimestamp = DateTime.fromISO(scheduleDateTime, zoneUTC);
        if(targetTimestamp.isValid){
            minutes = targetTimestamp.minute;
            hours = targetTimestamp.hour;
            dayOfMonth = targetTimestamp.day;
            month = targetTimestamp.month;
        }else{
            const targetTimestampJsFormat = DateTime.fromJSDate(scheduleDateTime, zoneUTC);
            minutes = targetTimestampJsFormat.minute;
            hours = targetTimestampJsFormat.hour;
            dayOfMonth = targetTimestampJsFormat.day;
            month = targetTimestampJsFormat.month;
        }
        const cronExpression = `${minutes} ${hours} ${dayOfMonth} ${month} *`;
        return cronExpression
}
module.exports.FormatPhoneNumber = (phoneNumber, countryCode) => {
    return countryCode + phoneNumber;
}
