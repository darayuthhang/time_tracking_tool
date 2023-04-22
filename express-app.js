const express = require('express');
const cors = require('cors');
const {task, user} = require("./api/index");


module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());

    user(app);
    task(app);
    
    //api
    // customer(app);
    // products(app);
    // shopping(app);

    // error handling
    //app.use(HandleErrors);

}
