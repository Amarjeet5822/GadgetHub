const Product = require("../models/product.model");
const AppError = require("../utils/AppError")

const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7; // Default 50 products per request
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);

    if (products.length === 0) {
      return res.status(404).json({ message: "No Data Found" });
    }
    console.log("total products : ",products.length)
    res.status(200).json(products);
  } catch (error) {
    next(new AppError(500, error.message || "Failed to fetch products"));
  }
};

const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if(! product) {
      return next(new AppError(404, "No data Found"))
    }
    res.status(200).json(product);
  } catch (error) {
    next(new AppError(500, error.message || "Failed to fetch product"))
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    const { category } = req.query; // Get category from query params

    let filter = {};
    if (category) {
      filter.category = category; // Apply category filter if provided
    }
    
    const products = await Product.find(filter); // Fetch filtered products
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getProducts, getProductById, getFilteredProducts };
