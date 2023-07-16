require('dotenv').config()
const { UserRepository, SubscriptionRepository } = require("../database/repository/index")
const { APIError, STATUS_CODES } = require("../utils/app-errors");

module.exports = class StripeService {
    /**
     * @Todo update user to pro when user successful 
     * fill in info in stripe payment.
     */
    constructor() {
        this.stripeSecretKey = "";
        this.productPRO = ""
        this.clientUrl = ""
        if (process.env.NODE_ENV === 'local') {
            this.clientUrl = process.env.CLIENT_URL
            this.stripeSecretKey = process.env.STRIPE_TEST_SECRET_KEY
            this.productPRO = process.env.STIRPE_PRODUCT_PRO_TEST
        } else {
            const ONE_DOLLAR = "price_1NSMhUEHMSSFUM4o8oIWH3vH";
            const TWO_DOLLAR = "price_1NL9uIEHMSSFUM4ooucxHgum"
            //price_1NSMhUEHMSSFUM4o8oIWH3vH this is one dollar
            //price_1NL9uIEHMSSFUM4ooucxHgum this is 8 dollar
            this.clientUrl = "https://www.taskkru.com"
            this.productPRO = ONE_DOLLAR
            this.stripeSecretKey = process.env.STRIPE_SECRET_KEY
        }
        this.stripe = require("stripe")(this.stripeSecretKey);
        this.subscriptionRepository = new SubscriptionRepository();
    }
    async createCheckout(userId) {
        try {
            const subId = await this.subscriptionRepository.getSubId(userId);
            if (subId){
                const subscription = await this.stripe.subscriptions.retrieve(subId);
                 // Check if customer has an active subscription
                if(subscription){
                    throw new Error('You are already subscribed.')
                }
            }else{
                const session = await this.stripe.checkout.sessions.create({
                    //card
                    payment_method_types: ["card"],
                    line_items: [
                        {
                            price: this.productPRO,
                            quantity: 1
                        },
                    ],
                    mode: "subscription",
                    success_url: `${this.clientUrl}/stripe-payment/success`,
                    cancel_url: `${this.clientUrl}/stripe-payment/failure`,
                });
                return session.id
            }
           
        } catch (error) {
            throw new APIError('API Error', error?.message);
        }
        
    }
    async subscribe(userId, accountType, plan, stripeSubId){
        try {
            let subDb = await this.subscriptionRepository.createSubscription(userId, accountType, plan, stripeSubId);
        } catch (error) {
            throw new APIError('API Error', error?.message);
        }
    }
    async unsubscribe(userId) {
        try {
            let subId = await this.subscriptionRepository.getSubId(userId);
            await this.stripe.subscriptions.del(subId);
            await this.subscriptionRepository.unsubscribe(userId, subId, "free")
        } catch (error) {
            throw new APIError('API Error', error?.message);
        }
    }
}

