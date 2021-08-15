const isAdminMiddleware = async (req, res, next) => {
  const user = res.locals.user;
  if (user.role === "admin") {
    next();
  } else {
    res.status(401).send(`User ${user.name} unauthorized. Error 401.`);
  }
};

module.exports = {
  isAdminMiddleware
};
