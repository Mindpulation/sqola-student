const config = require('config')
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model')
const validator = require('../../../helpers/utils/validator');

import { save } from "mongooo/lib/mongo/insert.js";
import Mongo from "mongooo/lib/mongo/index.js";

const mongo1 = new Mongo();

const obj1 = mongo1.setup(config.get('mongoDbStudentUrl'), "DataSiswa", "User");

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
    // await Promise.all(save(obj1, {
    //     Email : req.body.Email,
    //     Password : req.body.Password
    // }));
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
