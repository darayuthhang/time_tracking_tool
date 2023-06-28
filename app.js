const express = require('express');
const redis = require('redis');


const {databaseConnection} = require("./database/index");
const expressApp = require('./express-app');
const ScheduleUtil = require("./utils/schedule-util");
const path = require('path');

const StartServer = async () => {
    const configSchedule = new ScheduleUtil();
    const app = express();

    const REDIS_PORT = process.env.REDIS_URL || 'redis://redis:6379'
    let client = ""
    // Create a Redis client
    if(process.env.NODE_ENV === 'local'){
        client = await redis.createClient({
            url: REDIS_PORT
        });
    }else{
        //production
        client = await redis.createClient({
            url: process.env.REDIS_URL,
            socket: {
                tls: true,
                rejectUnauthorized: false,
            }
        });
    }
    
    await client.connect();
    client.on('connect', (err) => {
        if (err) throw err;
        else console.log('Redis Connected..!');
    });
    client.on('error', err => console.log('Redis Client Error', err));

  
    await databaseConnection();
    await expressApp(app, client);
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
            console.error('Error confisgusring cron jobsssssss:', error);
        })
        // .on('error', (err) => {
        // console.log(err);
        // process.exit();
        // })
}

StartServer();

