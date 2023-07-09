
const {
    APIError,
    BadRequestError,
    STATUS_CODES,
} = require("../../utils/app-errors");
const db = require("../../config/index");
const logger = require("../../utils/error-handler")
const { ApiRepositoryMessage } = require('../../constant/message');
const { TABLE_SUBSCRIPTIONS, TABLE_USERS } = require("../table-name");


module.exports = class SubscriptionRepository {
    constructor() {
        this.sub = "SUBSCRIPTION-REPOSITORY"
    }
    //- user id , plan and created_at
    async createSubscription(userId, accountType, plan, stripeSubId){
        try {
            return await db.transaction(async trx => {
                await trx(TABLE_SUBSCRIPTIONS).insert({ user_id: userId, 
                    plan, 
                    created_at: new Date(),
                    stripe_sub_id: stripeSubId
                })
                const user = await trx(TABLE_USERS).where('id', userId).update({
                    account_type: accountType,
                    updated_at: new Date()
                })
            })
        } catch (error) { 
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, `Unable to SUBSCRIPTION ${this.sub}:${error.message}`)
        }
    }
    async getSubId(userId){
        try {
            let id = await db(TABLE_SUBSCRIPTIONS)
                .select('stripe_sub_id')
                .where({ user_id: userId })
            return id[0]?.stripe_sub_id
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, `Unable to SUBSCRIPTION ${this.sub}:${error.message}`)
        }
    }
    
    async unsubscribe(userId, subId, accountType) {
        try {
            return await db.transaction(async trx => {
                await trx(TABLE_SUBSCRIPTIONS).where({
                    user_id: userId,
                    stripe_sub_id: subId
                }).del()
                const user = await trx(TABLE_USERS).where('id', userId).update({
                    account_type: accountType,
                    updated_at: new Date()
                })
            })
        } catch (error) {
            throw new APIError('API Error', STATUS_CODES.NOT_FOUND, `Unable to SUBSCRIPTION ${this.sub}:${error.message}`)
        }
    }

}
