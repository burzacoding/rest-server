const mongoose = require('mongoose');

const DB_URI = process.env.DB_CONNECTION_LINK + process.env.DB_NAME;

const dbConnection = async () => {
  console.log("Conectando...");
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Base de datos online, conectada a', process.env.DB_NAME);
  } catch (error) {
    throw new Error(`Error conectando a la base de datos: ${error}`);
  }
};

module.exports = {
  dbConnection,
};
