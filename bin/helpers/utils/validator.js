// const joi = require('joi');
const { signup } = require('../../modules/student/repositories/commands/command_model')
const validate = require('validate.js');
const wrapper = require('../../helpers/utils/wrapper');
const joi = require('joi')

const isValidPayload = (payload, models) => {
    const { value, error } = joi.validate(payload, models);
    if(!validate.isEmpty(error)){
        return wrapper.error(error, 409);
    }
    return wrapper.data(value, 'success', 200);

};

module.exports = {
    isValidPayload
};
