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

const update = joi.object({
    findEmail: joi.string().email({tlds: {allow: true}}).required(),
    email : joi.string().email({tlds: {allow: true}}).optional(),
    name : joi.string().optional(),
    photo : joi.string().optional(),
    address : joi.string().optional(),
    phone : joi.string().optional(),
    nis : joi.string().optional(),
    agama : joi.string().optional(),
    gender : joi.boolean().optional(),
    class : joi.string().optional(),
    vocation : joi.string().optional(),
    year : joi.string().optional(),
    password : joi.string().optional(),
    selfDescription : joi.string().optional(),
    linkSocialMedia : joi.array().items({
        platform : joi.string().required(),
        link : joi.string().required()
    }).optional(),
    bornDate : joi.date().optional(),
    achievement : joi.array().items({
        title : joi.string().required(),
        description : joi.string().optional(),
        date : joi.date().required(),
        photo : joi.string().optional()
    }).optional(),
    organization : joi.array().items({
        name : joi.string().required(),
        title : joi.string().required(),
        description : joi.string().optional(),
        dateStart : joi.string().required(),
        dateEnd : joi.string().required(),
        photo : joi.string().optional()
    }).optional(),
    portofolio : joi.array().items({
        link : joi.string().required()
    }).optional(),
    experience : joi.array().items({
        name : joi.string().required(),
        title : joi.string().required(),
        description : joi.string().optional(),
        dateStart : joi.string().required(),
        dateEnd : joi.string().required(),
        photo : joi.string().optional()
    }).optional()
});

const find = joi.object({
    email : joi.string().email({tlds: {allow: true}}).optional(),
    name : joi.string().optional(),
    photo : joi.string().optional(),
    address : joi.string().optional(),
    phone : joi.string().optional(),
    nis : joi.string().optional(),
    agama : joi.string().optional(),
    gender : joi.boolean().optional(),
    class : joi.string().optional(),
    vocation : joi.string().optional(),
    year : joi.string().optional()
})

const remove = joi.object({
    email : joi.string().email({tlds: {allow: true}}).required()
})

module.exports = {
    login,
    signup,
    update,
    find,
    remove
};
