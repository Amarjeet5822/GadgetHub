const express = require("express");
const { getUserWishlist, addToWishlist, deleteWishlist } = require("../controllers/wishlistController");

const wishlistRoute = express.Router();

wishlistRoute.get("/", getUserWishlist );
wishlistRoute.post("/", addToWishlist)
wishlistRoute.delete("/:productId", deleteWishlist)


module.exports =  wishlistRoute;