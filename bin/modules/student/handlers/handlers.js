const config = require('config')
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model')
const validator = require('../../../helpers/utils/validator');

const SigninStudent = async (req, res) => {

}

const SignupStudent = async (req, res) => {
    const payload = req.body;
    const validatePayload = validator.isValidPayload(payload, commandModel.signup);

    const postRequest = async (result) => {
        if(result.err){
            return result;
        }
        await commandHandler.insertDataStudent(result.data)
    }

    const sendRequest = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, 'Student Signup', 400)
            :
        wrapper.response(res, 'success', result, )
    }
}

const UpdateStudent = async (req, res) => {

}

const DeleteStudent = async (req, res) => {

}

module.exports = {
    SigninStudent,
    SignupStudent,
    UpdateStudent,
    DeleteStudent
}
