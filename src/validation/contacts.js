import Joi from "joi";

export const createStudentSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().regex(/^\d+$/).min(3).max(20).required().messages({
        'string.base': 'Number should be a digits',
        'string.regex': 'Number must contain only digits',
        'string.min': 'Number must have at least 10 digits',
        'string.max': 'Number should have at most 15 digits',
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(20).required()
});
