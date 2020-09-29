const wrapper = require('../../../helpers/utils/wrapper');
const validator = require('../../../helpers/utils/validator');
const { signup, login, update, remove, find } = require('../repositories/commands/command_model')
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
        (result.err) ? wrapper.response(res, 'fail', result, result.message, 400)
            : wrapper.response(res, 'success', result, result.message, 200);
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
            : wrapper.response(res, 'success', result, result.message, 200);
        console.log("\nIni Result : ", result)

    };
    sendResponse(await postRequest(validate));

}

const UpdateStudent = async (req, res) => {
    const validate = validator.isValidPayload(req.body, update);
    const postRequest = async (result) => {
        console.log("\nIni Result : ", result)
        if (result.err) {
            return result;
        }
        const output = await updateDataStudent(result);
        console.log("Ini output : ", output)
        return output;
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, result.message, 400)
            : wrapper.response(res, 'success', result, result.message, 200);
        console.log("\nIni Result : ", result)

    };
    sendResponse(await postRequest(validate));
}

const DeleteStudent = async (req, res) => {
    const validate = validator.isValidPayload(req.body, remove);
    const postRequest = async (result) => {
        console.log("\nIni Result : ", result)
        if (result.err) {
            return result;
        }
        const output = await deleteDataStudent(result);
        console.log("Ini output : ", output)
        return output;
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, result.message, 400)
            : wrapper.response(res, 'success', result, result.message, 200);
        console.log("\nIni Result : ", result)

    };
    sendResponse(await postRequest(validate));
}

const FindStudent = async (req, res) => {
    const validate = validator.isValidPayload(req.body, find);
    const postRequest = async (result) => {
        console.log("\nIni Result : ", result)
        if (result.err) {
            return result;
        }
        const output = await findDataStudent(result);
        console.log("Ini output : ", output)
        return output;
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, result.message, 400)
            : wrapper.response(res, 'success', result, result.message, 200);
        console.log("\nIni Result : ", result)

    };
    sendResponse(await postRequest(validate));
}

module.exports = {
    SigninStudent,
    SignupStudent,
    UpdateStudent,
    DeleteStudent,
    FindStudent
}
