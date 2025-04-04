const express = require("express");
const { getProducts, getProductById, getFilteredProducts } = require("../controllers/productController");

const productRoute = express.Router();
//
productRoute.get("/", getProducts )
// @path http://localhost:8080/product?category=q
productRoute.get("/category", getFilteredProducts)
productRoute.get("/:productId", getProductById )

module.exports = productRoute;