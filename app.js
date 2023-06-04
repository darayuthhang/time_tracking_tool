const express = require('express');

const {databaseConnection} = require("./database/index");
const expressApp = require('./express-app');
const path = require('path');

const StartServer = async () => {

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
    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    // .on('error', (err) => {
    //     console.log(err);
    //     process.exit();
    // })
}

StartServer();

