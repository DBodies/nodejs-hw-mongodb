import Joi from "joi";

export const registerUserSchema = Joi.object(
    {
        name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
        }),
        email: Joi.string().email().min(3).max(20).required().messages({
        'string.email': `"email" must be a valid email. Example: "example@gmail.com"`,
        'string.min': `"email" must be at least {#limit} characters`,
        'string.max': `"email" must be at most {#limit} characters`,
        }),
        password: Joi.string().required().min(3).messages({
        'string.min': `"password should be at least {#limit} characters`
        })
    }
);

console.log('auth validation loaded');
export const loginUserSchema = Joi.object(
    {
        email: Joi.string().required().email().messages({
        'string.email': `"email" must be a valid email. Example: "example@gmail.com"`
        }),
        password: Joi.string().required().min(3)
    }
);

export const requestResetEmailSchema = Joi.object(
    {
    email: Joi.string().email().required()
    }
);

export const resetPasswordSchema = Joi.object(
    {
          password: Joi.string().required(),
  token: Joi.string().required(),
    }
);
