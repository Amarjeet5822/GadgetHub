const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email:{ type:String, unique: true, required: true },
  password: {type: String, required: true },
  name: {type: String, required: true },
  mobileNumber: {type: String, default: "" },
  address: { type: String, default:"" },
}, {
  versionKey: false,
});

const User = mongoose.model("User", userSchema);

module.exports = User; 
