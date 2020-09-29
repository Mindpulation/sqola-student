const joi = require('joi');

const login = joi.object({
    email: joi.string().email({ tlds: { allow: true } }).required(),
    password: joi.string().required(),
});

const signup = joi.object({
   email: joi.string().email({tlds: {allow: true}}).required(),
   password: joi.string().required(),
   name: joi.string().required()
})


module.exports = {
    login,
    signup
};
