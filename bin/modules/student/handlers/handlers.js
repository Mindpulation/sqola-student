const config = require('config')
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model')
const validator = require('../../../helpers/utils/validator');
const { insertDataStudent, signinDataStudent, updateDataStudent, deleteDataStudent } = require('../repositories/commands/command_handler');

const SigninStudent = async (req, res) => {
    const {value, error} = validator.isValidPayload(req.body);
    (error) ?  wrapper.response(res, 'fail', {}, 'Student Signup', 400) : null;

    const ress = await signinDataStudent(value);

    (ress.status) ? wrapper.response(res, 'success', ress.result ,200) :  wrapper.response(res, 'fail', ress.result, 'Student Signup', 400);

}

const SignupStudent = async (req, res) => {
    const {value, error} = validator.isValidPayload(req.body);
    (error) ?  wrapper.response(res, 'fail', {}, 'Student Signup', 400) : null;

    const ress = await insertDataStudent(value);

    (ress.status) ? wrapper.response(res, 'success', ress.result ,200) :  wrapper.response(res, 'fail', ress.result, 'Student Signup', 400);

}

const UpdateStudent = async (req, res) => {
    const {value, error} = validator.isValidPayload(req.body);
    (error) ?  wrapper.response(res, 'fail', {}, 'Student Signup', 400) : null;

    const ress = await updateDataStudent(value);

    (ress.status) ? wrapper.response(res, 'success', ress.result ,200) :  wrapper.response(res, 'fail', ress.result, 'Student Signup', 400);
}

const DeleteStudent = async (req, res) => {
    const {value, error} = validator.isValidPayload(req.body);
    (error) ?  wrapper.response(res, 'fail', {}, 'Student Signup', 400) : null;

    const ress = await deleteDataStudent(value);

    (ress.status) ? wrapper.response(res, 'success', ress.result ,200) :  wrapper.response(res, 'fail', ress.result, 'Student Signup', 400);
}

module.exports = {
    SigninStudent,
    SignupStudent,
    UpdateStudent,
    DeleteStudent
}
