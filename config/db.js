const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection established");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
