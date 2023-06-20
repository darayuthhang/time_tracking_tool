const express = require('express');
const cors = require('cors');
const {task, user, project, consent} = require("./api/index");
const { MidError } = require("./utils/middleware-error");
const NodeCache = require("node-cache");
const https = require('https');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 100 });
module.exports = async (app) => {
    // app.use((req, res, next) => {
    //     if (req.protocol === 'http') {
    //         const httpsUrl = `https://${req.headers.host}${req.url}`;
    //         return res.redirect(301, httpsUrl);
    //     }
    //     next();
    // });
    app.use(express.json());
    app.use(cors());

    user(app);
    task(app, cache);
    project(app);
    consent(app);
    
    //api
    // customer(app);
    // products(app);
    // shopping(app);

    // error handling
    app.use(MidError);

}

