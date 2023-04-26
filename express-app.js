const express = require('express');
const cors = require('cors');
const {task, user, project} = require("./api/index");
const { MidError } = require("./utils/middleware-error");

module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());

    user(app);
    task(app);
    project(app);
    
    //api
    // customer(app);
    // products(app);
    // shopping(app);

    // error handling
    app.use(MidError);

}
