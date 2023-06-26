const express = require('express');

const {databaseConnection} = require("./database/index");
const expressApp = require('./express-app');
const ScheduleUtil = require("./utils/schedule-util");
const path = require('path');

const StartServer = async () => {
    const configSchedule = new ScheduleUtil();
    const app = express();

    await databaseConnection();
    await expressApp(app);
    const PORT = process.env.PORT || 5000;
    if (process.env.NODE_ENV !== 'local') {
        app.use(express.static(path.join(__dirname, 'client/build')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/client/build/index.html'));
        });
    }
    // app.listen(PORT, () => {
    //     console.log(`listening to port ${PORT}`);
    // })
    /**
     * @description
     *  - Node cron job causing the spike 
     */
    configSchedule.configCronjob()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`listening to port ${PORT}`);
            })
        })
        .catch((error) => {
            console.error('Error confisgusring cron jobssssss:', error);
        })
        // .on('error', (err) => {
        // console.log(err);
        // process.exit();
        // })
}

StartServer();

