const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
import { save } from "mongooo/lib/mongo/insert.js";
import Mongo from "mongooo/lib/mongo/index.js";

const mongo1 = new Mongo();

const obj1 = mongo1.setup("ENV.database", "DataSiswa", "User");

const SigninStudent = async (req, res) => {
    await Promise.all(save(obj1, {
        Email : req.body.Email,
        Password : req.body.Password
    }))
}

const SignupStudent = async (req, res) => {

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
