const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose
    .connect(process.env.URL_DB, {
      useNewUrlParser: true,
      family: 4,
    });

  console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.underline.bold);
};

module.exports = connectDB;
