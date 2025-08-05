import Joi from "joi";

export const createStudentSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber:Joi.string().pattern(/^\+?[0-9]{10,15}$/).required().messages({
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

export const studentSchemaPatch = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
  phoneNumber: Joi.string().pattern(/^\+?[0-9]{10,15}$/).messages({
    'string.base': `"phoneNumber" must be a string of digits`,
    'string.pattern.base': `"phoneNumber" must contain only digits, optionally starting with "+". Example: "+380931234567"`,
    'string.min': `"phoneNumber" must be at least {#limit} characters`,
    'string.max': `"phoneNumber" must be at most {#limit} characters`,
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.email': `"email" must be a valid email. Example: "example@gmail.com"`,
    'string.min': `"email" must be at least {#limit} characters`,
    'string.max': `"email" must be at most {#limit} characters`,
  }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(20)
});
