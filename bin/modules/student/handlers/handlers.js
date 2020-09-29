const wrapper = require('../../../helpers/utils/wrapper');
const validator = require('../../../helpers/utils/validator');
const { signup, login } = require('../repositories/commands/command_model')
const { insertDataStudent, signinDataStudent, updateDataStudent, deleteDataStudent, findDataStudent } = require('../repositories/commands/command_handler');

const SigninStudent = async (req, res) => {

    const validate = validator.isValidPayload(req.body, login);
    const postRequest = async (result) => {
        console.log("\nIni Result : ", result)
        if (result.err) {
            return result;
        }
        const output = await signinDataStudent(result);
        console.log("Ini output : ", output)
        return output;
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, 'Failed Signin Student', 400)
            : wrapper.response(res, 'success', result, 'Success Signin Student', 200);
    };
    sendResponse(await postRequest(validate));

}

const SignupStudent = async (req, res) => {

    const validate = validator.isValidPayload(req.body, signup);
    const postRequest = async (result) => {
        console.log("\nIni Result : ", result)
        if (result.err) {
            return result;
        }
        const output = await insertDataStudent(result);
        console.log("Ini output : ", output)
        return output;
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, result.message, 400)
            : wrapper.response(res, 'success', result, 'Success Signup Data', 200);
        console.log("\nIni Result : ", result)

    };
    sendResponse(await postRequest(validate));

}

const UpdateStudent = async (req, res) => {
    const {value, error} = validator.isValidPayload(req.body);
    (error) ?  wrapper.response(res, 'fail', {}, 'Student Signup', 400) : null;

    const ress = await updateDataStudent(value);

    (ress.status) ? wrapper.response(res, 'success', ress.result ,200) :  wrapper.response(res, 'fail', ress.result, 'Student Signup', 400);
}

const DeleteStudent = async (req, res) => {
    const {value, error} = validator.isValidPayload(req.params);
    (error) ?  wrapper.response(res, 'fail', {}, 'Student Signup', 400) : null;

    const ress = await deleteDataStudent(value);

    (ress.status) ? wrapper.response(res, 'success', ress.result ,200) :  wrapper.response(res, 'fail', ress.result, 'Student Signup', 400);
}

const FindStudent = async (req, res) => {
    const {value, error} = validator.isValidPayload(req.params);
    (error) ?  wrapper.response(res, 'fail', {}, 'Student Signup', 400) : null;

    const ress = await findDataStudent(value);

    (ress.status) ? wrapper.response(res, 'success', ress.result ,200) :  wrapper.response(res, 'fail', ress.result, 'Student Signup', 400);
}

module.exports = {
    SigninStudent,
    SignupStudent,
    UpdateStudent,
    DeleteStudent,
    FindStudent
}
