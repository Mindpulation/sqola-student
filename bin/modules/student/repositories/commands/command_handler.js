const command = require('./command');

const insertDataStudent = (payloadDataSignup) => {
    return command.insertData(payloadDataSignup);
}

const signinDataStudent = (payloadDataSignup) => {
    return command.compareData(payloadDataSignup)
}

module.exports = {
    insertDataStudent
}
