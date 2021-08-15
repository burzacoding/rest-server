const checkGooglesigninMiddleware = (req, res, next) => {

  if (!req.body) {
    return res.status(400).send('El body no puede estar vacio')
  }

  const token = req.header('x-googlesignin-token');

  if (!token) {
    return res.status(400).send('El token no puede estar vacio')
  }

  res.locals.token = token;
  next()

};

module.exports = { checkGooglesigninMiddleware };
