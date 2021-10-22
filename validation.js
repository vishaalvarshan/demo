const Joi = require("joi");

const validate = (req, res, next) => {
    const params = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
    });
};

module.exports = {validate}