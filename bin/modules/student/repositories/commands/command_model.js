const joi = require('joi');

const login = joi.object({
    email: joi.string().email({ tlds: { allow: true } }).required(),
    password: joi.string().required(),
});

const signup = (payload) => {
    console.log("Ini payload : ",payload);
    const signup = joi.object({
        email: joi.string().email({ tlds: { allow: true } }).required(),
        password: joi.string().required(),
        name: joi.string().required()
    });
    const result = signup.validate(payload);
    return result
}

module.exports = {
    login,
    signup
};
