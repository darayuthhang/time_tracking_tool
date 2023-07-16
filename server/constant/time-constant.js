const TimeConstant = {
    getSixMinute() {
        return Date.now() + 1 * 60 * 1000;
    },
    getTwentyFourHours() {
        return Date.now() + 24 * 3600 * 1000;
    }
};
module.exports = TimeConstant;
