
const ErrorHandler = (error, req, res, next) => {
    if(!error.statusCode) error.statusCode = 400;
    return res.status(error?.statusCode).json({ success: false, message: error.message })
}
module.exports = {
    MidError:ErrorHandler
}
