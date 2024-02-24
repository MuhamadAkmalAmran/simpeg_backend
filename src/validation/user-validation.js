import Joi from 'joi';

const registerValidation = Joi.object({
  nama: Joi.string().required(),
  username: Joi.string().length(16).message('Username at least 16 characters').required(),
  email: Joi.string().email().message('Email invalid').required(),
  password: Joi.string().length(8).message('Password at least 8 characters').required(),
});

const loginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const getUserNameValidation = Joi.string().required();

export {
  registerValidation,
  loginValidation,
  getUserNameValidation,
};
