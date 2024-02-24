import ResponseError from '../utils/response-error.js';

const validate = (schema, request) => {
  const result = schema.validate(request, {
    aborrtEarly: false,
    // allowUnknown: false,
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export default validate;
