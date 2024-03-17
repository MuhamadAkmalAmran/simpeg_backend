import Joi from 'joi';

const registerValidation = Joi.object({
  nama: Joi.string().required(),
  nip: Joi.string().length(18).message({
    'string.length': 'nip at least 18 characters',
  }),
  status_kepegawaian: Joi.string().required(),
  password: Joi.string().length(8).message('Password at least 8 characters').required(),
});

const loginValidation = Joi.object({
  nip: Joi.string().optional(),
  password: Joi.string().optional(),
});

const getUserValidation = Joi.string().required();

export {
  registerValidation,
  loginValidation,
  getUserValidation,
};
