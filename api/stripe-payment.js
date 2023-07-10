require('dotenv').config()
const apiVersion = require("../constant/api_version");
const { StripeService } = require("../services/index");
const { stripeTimeLimit } = require("./middleware/rate-limit");
const logger = require("../utils/error-handler");
const { ApiRouteMessage } = require("../constant/message")
const {
    validationStripePaymentData,
    validationStripeUnsubscribeData,
    validationStripePaymentRule } = require("./middleware/validatorStripePayment")

module.exports = (app, cache, express) => {
    const { API_VERSION } = apiVersion;
    const stripeService = new StripeService();

    //test number --> 4242 4242 4242 4242
    /**
     * @descipriotn 
     *  - we do not need userAUth for now because 
     *    we need to let user who subscribe on front-page
     *    to be able to access stripe checkout.
     */
    app.post(`${API_VERSION}/create-checkout-session`,
        stripeTimeLimit, 
        validationStripePaymentData(), 
        validationStripePaymentRule,
        async (req, res, next) => {
            try {
                const { userId } = req.body;
                if(!userId) return res.status(400).json({success: false});
                const sessionid = await stripeService.createCheckout(userId);
                const fiveMintues = 300;
                await cache.set('userIdForStripe', userId, {
                    EX: fiveMintues,
                    NX: true
                });
                //update account to pro.
                res.json({ id: sessionid });
            } catch (error) {
                next(error);
            }
    });
    /**
     * @The best way is to use stripe webhook
     */
    app.post('/webhook', async (req, res, next) => {
        try {
            let stripe, webhookSecret;
            if(process.env.NODE_ENV === 'local'){
                stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
                webhookSecret = process.env.STRIPE_WEB_HOOK_END_POINT_TESTING
            }else{
                stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
                webhookSecret = process.env.STRIPE_WEB_HOOK_END_POINT_PROD
                // stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
            }
           
            let event;
            const sig = req.headers['stripe-signature'];
            try {
                event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
                
            } catch (err) {
                console.log(err);
                return res.status(500).send(`Webhook Error: ${err.message}`);
            }
            // Handle the event
            switch (event.type) {
                // case 'checkout.session.completed': 
                //     const session = event.data.object;
                 
                //     if (session.subscription) {
                //         const subscriptionId = session.subscription;
                //         // Retrieve the subscription details from Stripe API using the subscriptionId
                //         const subscription = await stripe.subscriptions.retrieve(subscriptionId);

                //     }
                  

                //     break;
                case 'customer.subscription.created':
                    const subscription = event.data.object;
                  
                    const userId = await cache.get('userIdForStripe')
                    if(subscription){
                        if (userId) {
                            //done
                            await stripeService.subscribe(userId, "pro", "pro", subscription?.id);
                            await cache.del(userId)
                        }
                    }
                    // Handle the creation of a new subscription
                    // E.g., update customer data, send confirmation email, etc.
                    break;
                case 'customer.subscription.deleted':
                    const canceledSubscription = event.data.object;
                    break;

                case 'customer.subscription.updated':
                    // const updatedSubscription = event.data.object;
                    // console.log('Subscription updated:', updatedSubscription);

                    // Handle the update of a subscription
                    // E.g., update customer data, adjust service access, etc.
                    break;

                // case 'payment_intent.succeeded':
                //     // const paymentIntent = event.data.object;
                //     const userId = await cache.get('userIdForStripe')
                //     if (userId) {
                //         await stripeService.subscribe(userId, "pro");
                //         await cache.del(userId)
                //     }
                //     break;
                // case 'payment_intent.payment_failed':
                //     //const paymentMethod = event.data.object;
                //     await cache.del('userIdForStripe')    
                //     break;
             
                default:
                    console.log(`Unhandled evessnst type ${event.type}`);
            }

            // Return a response to acknowledge receipt of the event
            res.json({ received: true })
        } catch (error) {
            next(error);
        }
      
    });
    /**
     * 
     */
    app.get(`${API_VERSION}/stripe-payment/unsubscribe/:userId`, 
        stripeTimeLimit, 
        validationStripeUnsubscribeData(),
        validationStripePaymentRule, 
    async (req, res, next) => {
        logger.info(ApiRouteMessage(`${API_VERSION}/stripe-payment/unsubscribe/:userId`, "GET"))
        const { userId } = req.params;
        try {
            await stripeService.unsubscribe(userId);
            return res.status(200).json({ success: true, message: "success" })
        } catch (error) {
            next(error);
        }
    })
      
    

}
