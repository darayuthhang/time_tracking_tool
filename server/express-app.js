const express = require('express');
const cors = require('cors');
const {task, user, project, consent, stripePayment} = require("./api/index");
const { MidError } = require("./utils/middleware-error");

// const NodeCache = require("node-cache");
// const cache = new NodeCache({ stdTTL: 100, checkperiod: 100 });
module.exports = async (app, cache, express) => {
    const setupForStripeWebhooks = {
        // Because Stripe needs the raw body, we compute it but only when hitting the Stripe callback URL.
        verify: function (req, res, buf) {
            var url = req.originalUrl;
            if (url.startsWith('/webhook')) {
                req.rawBody = buf.toString();
            }
        }
    };
    // app.use(express.raw({ type: 'application/json' }));
    // app.use(express.static('public'));
    // app.use(express.json())
    app.use(express.json(setupForStripeWebhooks));
   
    // app.use(express.raw({ type: 'application/json' }))
    app.use(cors());

    user(app);
    task(app, cache);
    project(app);
    consent(app);
    stripePayment(app, cache, express)

    //api
    // customer(app);
    // products(app);
    // shopping(app);

    // error handling
    app.use(MidError);

}

