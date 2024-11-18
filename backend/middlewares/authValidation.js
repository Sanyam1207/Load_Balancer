const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(4).max(100).required(),
        username: Joi.string().min(3).max(100).required(),
    })
    const {error} = schema.validate(req.body)

    if (error) {
        return res.status(400).json({
            message : "Error from Joi"
        })
    }
    next()
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(4).max(100).required(),
    })
    const {error} = schema.validate(req.body)

    if (error) {
        return res.status(400).json({
            message : "Error from Joi"
        })
    }
    next()
}

module.exports = {
    signupValidation,
    loginValidation
}