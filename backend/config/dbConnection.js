const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGO_URL

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log(" ✅ connected to db")
  } catch (error) {
    console.log("❌ failed to connect db")
  }
}

module.exports = { connectDB }
