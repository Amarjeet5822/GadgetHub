const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  image: { type: String, required: true },
  images: { type: [String], required: true },
  description: { type: String, required: true },
  features: { type: [String], required: true }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
