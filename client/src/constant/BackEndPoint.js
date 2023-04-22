const API_VERSION = "/api/v1"
class BackEndPoint{
    SIGN_UP = `${API_VERSION}/user/signup`
    LOGIN = `${API_VERSION}/user/login`
    VERIFY_USER = `${API_VERSION}/user/verify`
    RESENT_OTP = `${API_VERSION}/user/resent-otp-code`
    GOOGLE_LOGIN = `${API_VERSION}/user/google-login`
    RESET_PASSWORD = `${API_VERSION}/user/reset-password`
    UPDATE_PASSWORD = `${API_VERSION}/user/update-password`
}
export default new BackEndPoint();
