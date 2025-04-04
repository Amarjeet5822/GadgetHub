const express = require("express");
const { getProductBag, addProductBag, deleteProductBag } = require("../controllers/bagController");
const { IsUserAuthenticated } = require("../middleware/authMiddleware");


const bagRoute = express.Router();

bagRoute.get("/", getProductBag)
bagRoute.post("/",  addProductBag)
bagRoute.delete("/:productId", deleteProductBag)

module.exports = bagRoute;