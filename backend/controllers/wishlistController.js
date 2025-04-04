const Wishlist = require("../models/wishlist.model");
const AppError = require("../utils/AppError");

// Add product to wishlist
const addToWishlist = async (req, res, next) => {
  try {
    const {productId } = req.body;
    const { userId} = req.user;
    if (!productId) {
      return next(new AppError(400, "Product ID is required"));
    }

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      if (wishlist.products.some(p => p.toString() === productId)) {
        return next(new AppError(400, "Product already in wishlist"));
      }
      wishlist.products.push(productId);
    }
    await wishlist.save();
    res.status(201).json({ success: true, message: "Product added to wishlist", wishlist });
  } catch (error) {
    next(new AppError(500, error.message || "Failed to add product to wishlist"));
  }
};

// Remove a product from the user's wishlist
const deleteWishlist = async (req, res, next) => {
  try {
    const {productId } = req.params;
    const { userId} = req.user;
    if ( !productId) {
      return next(new AppError(400, " Product ID is required"));
    }
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return next(new AppError(404, "Wishlist not found for this user"));
    }
    const initialCount = wishlist.products.length;
    wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
    if (wishlist.products.length === initialCount) {
      return next(new AppError(404, "Product not found in wishlist"));
    }
    await wishlist.save();
    res.status(200).json({ success: true, message: "Product removed from wishlist", wishlist });
  } catch (error) {
    next(new AppError(500, error.message || "Failed to remove product from wishlist"));
  }
};

// Get the user's wishlist with populated product details
const getUserWishlist = async (req, res, next) => {
  try {
    const { userId} = req.user;
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
    if (!wishlist) {
      return next(new AppError(404, "Wishlist not found for this user"));
    }
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    next(new AppError(500, error.message || "Failed to fetch wishlist"));
  }
};

module.exports = { addToWishlist, deleteWishlist, getUserWishlist };
