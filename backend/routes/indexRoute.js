const express = require("express");
const userRoute = require("./userRoute")
const productRoute = require("./productRoute");
const { IsUserAuthenticated } = require("../middleware/authMiddleware");
const bagRoute = require("./bagRoute");
const wishlistRoute = require("./wishlistRoute");


const routes = express.Router();

routes.use("/auth", userRoute  );
routes.use("/product", productRoute);
routes.use("/bag", IsUserAuthenticated, bagRoute);
routes.use("/wishlist", IsUserAuthenticated, wishlistRoute);

module.exports = routes;