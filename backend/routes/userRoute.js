const express = require( "express");
const dotenv = require( "dotenv");
const { UserGet, UserLogin, UserLogout, UserSignup, UserUpdateDetails, UserUpdatePassword } = require( "../controllers/authController.js");
const { LoginMiddleware, SignupMiddleware, IsUserAuthenticated, LogoutMiddleware } = require( "../middleware/authMiddleware.js");
dotenv.config();

const userRoute = express.Router();
// url start with http://localhost:8080/auth/singup or login or / or update-details or update-password or logout
// @ public
userRoute.post("/signup", SignupMiddleware, UserSignup);
userRoute.post("/login", LoginMiddleware, UserLogin );
// @ protected
userRoute.get("/", IsUserAuthenticated, UserGet);
userRoute.patch("/update-details", IsUserAuthenticated, UserUpdateDetails);
userRoute.patch("/update-password", IsUserAuthenticated, UserUpdatePassword );
userRoute.post("/logout", IsUserAuthenticated, LogoutMiddleware, UserLogout );

module.exports = userRoute;