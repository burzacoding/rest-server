const Yup = require('yup');

const UserSchemaValidator = Yup.object({
  name: Yup.string()
    .trim()
    .required('error/name-required')
    .min(4, 'error/name-min')
    .max(72, 'error/name-max'),
  email: Yup.string()
    .trim()
    .email('error/not-email')
    .required('error/email-required'),
  password: Yup.string()
    .trim()
    .min(6, 'error/password-min')
    .max(72, 'error/password-max')
    .required('error/password-required'),
});

const userValidator = async (user) => {
  try {
    await UserSchemaValidator.validate(user, {
      abortEarly: false,
    });
    return null
  } catch (error) {
    return error.errors
  }
};

module.exports = {
  userValidator,
};
