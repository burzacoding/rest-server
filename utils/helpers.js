const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const generateToken = async (uid = "") => {
  console.log(process.env.JWT_KEY);
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "14 days",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken = "") => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return { name, email, picture } = payload;
};

module.exports = {
  generateToken,
  googleVerify,
};

// {
//   algorithm: "HS512",
//   expiresIn: '14 days'
// }
