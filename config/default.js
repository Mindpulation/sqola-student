require('dotenv').config()

module.exports = {
    dnsSentryUrl: process.env.DNS_SENTRY_URL,
    port: process.env.PORT,
    mongoDbRedeemUrl: process.env.MONGO_DB_REDEEM_URL,
}
