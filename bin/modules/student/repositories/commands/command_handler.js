const command = require('./command');

const insertDataStudent = (payloadDataSignup) => {
    return command.insertData(payloadDataSignup);
}

const signinDataStudent = (payloadDataSignup) => {
    return command.compareData(payloadDataSignup)
}

const updateDataStudent = (payloadDataUpdate) =>{
    return command.updateData(payloadDataUpdate)
}

module.exports = {
    insertDataStudent,
    signinDataStudent
}
