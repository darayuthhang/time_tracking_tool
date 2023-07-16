const db = require('../config/index');
module.exports = async () => {
    try {
        await db.raw('select 1+1 as result')
        console.log('Successfully connected to database')
    } catch (error) {
        console.error('Unable to connect to database:', error)
    }
}



