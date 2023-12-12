const mongoose = require("mongoose");

const connectDatabase = () => {
  return mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Successfully connected to MongoDB`);
    })
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;