require('dotenv').config()
const { UserRepository } = require("../database/repository/index")
const { APIError, STATUS_CODES } = require("../utils/app-errors");
module.exports = class StripeService {
    /**
     * @Todo update user to pro when user successful 
     * fill in info in stripe payment.
     */
    constructor() {
        this.stripeSecretKey = "";
        this.productPRO = ""
        if (process.env.NODE_ENV === 'local') {
            this.stripeSecretKey = process.env.STRIPE_TEST_SECRET_KEY
            this.productPRO = "price_1NM0g6EHMSSFUM4oWRPoouu8"
        } else {
            this.productPRO = "price_1NL9uIEHMSSFUM4ooucxHgum"
            this.stripeSecretKey = process.env.STRIPE_SECRET_KEY
        }
        this.stripe = require("stripe")(this.stripeSecretKey);
        this.userRepository = new UserRepository();
    }
    async createCheckout() {
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
            success_url: `${process.env.CLIENT_URL}/stripe-payment/success`,
            cancel_url: `${process.env.CLIENT_URL}/stripe-payment/failure`,
        });
        
        // await this.UserRepository.updateAccountType(userId, accountType)
        return session.id
    }
    async paymentPaid(userId, accountType){
        try {
            await this.userRepository.updateAccountType(userId, accountType);
        } catch (error) {
            throw new APIError('API Error', error?.message);
        }
    }
}

