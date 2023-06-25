require('dotenv').config()
const apiVersion = require("../constant/api_version");
const UserAuth = require('./middleware/auth')
const logger = require("../utils/error-handler");
const { ApiRouteMessage } = require("../constant/message")
const { StripeService } = require("../services/index")
const {
    validationStripePaymentData,
    validationStripePaymentRule } = require("./middleware/validatorStripePayment")
module.exports = (app, cache) => {
    const { API_VERSION } = apiVersion;
    const stripeService = new StripeService();
    //test number --> 4242 4242 4242 4242
    app.post(`${API_VERSION}/create-checkout-session`, 
        validationStripePaymentData(), 
        validationStripePaymentRule,
        async (req, res, next) => {
            try {
                const { userId } = req.body;
                const sessionid = await stripeService.createCheckout();
                cache.set('userIdForStripe', userId);
                //update account to pro.
                res.json({ id: sessionid });
            } catch (error) {
                next(error);
            }
    });
    /**
     * @The best way is to use stripe webhook
     */
    app.post('/webhook', async (req, res) => {
        try {
            const event = req.body;
            // Handle the event
            switch (event.type) {
                case 'payment_intent.succeeded':
                    // const paymentIntent = event.data.object;
                    const userId = cache.get('userIdForStripe')
                    if (userId) {
                        await stripeService.paymentPaid(userId, "pro");
                        cache.del(userId)
                    }
                    break;
                case 'payment_intent.payment_failed':
                    //const paymentMethod = event.data.object;
                    cache.del('userIdForStripe')    
                    break;
                // case 'payment_method.attached':
                //     const paymentMethod = event.data.object;
                //     // Then define and call a method to handle the successful attachment of a PaymentMethod.
                //     // handlePaymentMethodAttached(paymentMethod);
                //     break;
                // ... handle other event types
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }

            // Return a response to acknowledge receipt of the event
            res.json({ received: true })
        } catch (error) {
            next(error);
        }
      
    });

}
