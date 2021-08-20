const Yup = require("yup");

const name = Yup.string()
  .trim()
  .required("error/name-required")
  .min(4, "error/name-min")
  .max(72, "error/name-max");

const email = Yup.string()
  .trim()
  .email("error/not-email")
  .required("error/email-required");

const password = Yup.string()
  .trim()
  .min(6, "error/password-min")
  .max(72, "error/password-max")
  .required("error/password-required");

const UserApiSchemaValidator = Yup.object({
  name,
  email,
  password,
});

const UserAuthSchemaValidator = Yup.object({
  email,
  password,
});

const destruct = (obj, ...keys) =>
  keys.reduce((a, c) => ({ ...a, [c]: obj[c] }), {});

const getStagedData = (req, array) => {
  const body = {...req.body};
  return destruct(body, ...array)
};

const userValidator = async (user, SchemaValidator) => {
  try {
    await SchemaValidator.validate(user, {
      abortEarly: false,
    });
    return null;
  } catch (error) {
    return error.errors;
  }
};

const getErrorsAndStagedUserFromSchema = async (req, campos, validator) => {
  // Solo agarrar campos necesarios, ignoramos la basura
  const stagedUser = getStagedData(req, campos);
  // Validación de errores en la request
  const errors = await userValidator(stagedUser, validator);
  return [errors, stagedUser];
};

const userApiValidatorMiddleware = async (req, res, next) => {
  const [errors, stagedUser] = await getErrorsAndStagedUserFromSchema(
    req,
    ["email", "password", "name"],
    UserApiSchemaValidator
  );
  if (errors) {
    res.status(400).json({
      ok: false,
      errors,
      receivedData: req.body,
      stagedData: stagedUser,
    });
    return;
  } else {
    res.locals.stagedUser = stagedUser;
    next();
  }
};

const userAuthValidatorMiddleware = async (req, res, next) => {
  const [errors, stagedUser] = await getErrorsAndStagedUserFromSchema(
    req,
    ["email", "password"],
    UserAuthSchemaValidator
  );
  if (errors) {
    res.status(400).json({
      ok: false,
      errors,
      receivedData: req.body,
      stagedData: stagedUser,
    });
    return;
  } else {
    res.locals.stagedUser = stagedUser;
    next();
  }
};

module.exports = {
  userApiValidatorMiddleware,
  userAuthValidatorMiddleware,
  getStagedData
};
