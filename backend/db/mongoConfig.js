const mongoose = require("mongoose");
const colors = require("colors")

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB`.underline.cyan);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
