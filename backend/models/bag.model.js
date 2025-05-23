const mongoose = require("mongoose");

const bagSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // References Product ID
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Bag", bagSchema);
