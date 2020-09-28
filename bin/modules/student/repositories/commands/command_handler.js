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

const findDataStudent = (payloadDataFind) => {
    return command.findData(payloadDataFind)
}

module.exports = {
    insertDataStudent,
    signinDataStudent,
    updateDataStudent,
    deleteDataStudent,
    findDataStudent
}
