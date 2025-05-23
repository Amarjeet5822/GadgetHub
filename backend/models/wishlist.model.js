const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }] // References Product ID
}, { timestamps: true });

module.exports = mongoose.model("Wishlist", WishlistSchema);
