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

const deleteDataStudent = (payloadDataDelete) => {
    return command.deleteDataStudent(payloadDataDelete)
}

module.exports = {
    insertDataStudent,
    signinDataStudent,
    updateDataStudent,
    deleteDataStudent
}
