require('dotenv').config()

module.exports = {
    pathStudentEndpoint: process.env.PATH_STUDENT_ENDPOINT,
    dnsSentryUrl: process.env.DNS_SENTRY_URL,
    ports: process.env.PORT,
    mongoDbRedeemUrl: process.env.MONGO_DB_REDEEM_URL,
}
