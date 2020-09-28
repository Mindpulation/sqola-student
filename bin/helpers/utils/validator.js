// const joi = require('joi');
const { signup } = require('../../modules/student/repositories/commands/command_model')
const validate = require('validate.js');
const wrapper = require('../../helpers/utils/wrapper');

const isValidPayload = (payload) => {
    const { value, error } = signup.validate(payload);
    if(!validate.isEmpty(error)){
        return wrapper.error(error, 409);
    }
    return wrapper.data(value, 'success', 200);

};

module.exports = {
    isValidPayload
};
