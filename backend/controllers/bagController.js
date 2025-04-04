const Bag = require("../models/bag.model");
const AppError = require("../utils/AppError");

const getProductBag = async (req, res, next) => {
  try {
    const { userId } = req.user || {};
    const bag = await Bag.findOne({ user: userId }).populate("items.product");
    res.status(200).json({
      success: true,
      data: bag,
    });
  } catch (error) {
    next(new AppError(500, error.message || "Failed to get products"));
  }
};

const addProductBag = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body || {};
    const { userId } = req.user;

    // Validate productId
    if (!productId) {
      return next(new AppError(400, "Product ID is required"));
    }

    let bag = await Bag.findOne({ user: userId });

    if (!bag) {
      bag = new Bag({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = bag.items.find(
        (item) => item.product.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        bag.items.push({ product: productId, quantity });
      }
    }
    await bag.save();

    // Return the updated bag as a response
    res.status(200).json({
      success: true,
      message: "Product added to bag successfully",
      bag,
    });
  } catch (error) {
    next(new AppError(500, error.message || "Internal Server Error"));
  }
};

const deleteProductBag = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId } = req.user;
    const bag = await Bag.findOne({ user: userId });
    if (!productId) {
      return next(new AppError(400, "Product ID is required"));
    }
    if (!bag) {
      return next(new AppError(404, "Not found"));
    }
    bag.items = bag.items.filter(
      (item) => item.product.toString() !== productId
    );
    await bag.save();
    res.status(200).json({ message: "Removed from Bag" });
  } catch (error) {
    next(new AppError(500, error.message || "failed to delete product"));
  }
};

module.exports = { deleteProductBag, addProductBag, getProductBag };
