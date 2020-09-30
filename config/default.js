require('dotenv').config()

module.exports = {
    pathStudentEndpoint: process.env.PATH_STUDENT_ENDPOINT,
    dnsSentryUrl: process.env.DSN_SENTRY_URL,
    ports: process.env.PORT,
    mongoDbStudentUrl: process.env.MONGO_URL,
    mongoDbStudent: process.env.MONGO_DB,
    mongoDbStudentCol: process.env.MONGO_COL,
}
