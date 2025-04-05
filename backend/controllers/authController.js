const User = require("../models/user.model.js");
const AppError = require("../utils/AppError.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();

const UserSignup = async (req, res, next ) => {
  console.log("UserSignup (req.body) :=>", req.body)
  const {email, password, name } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
     // Create and save the new user
     const user = await User.create({ email, password: hash, name });
     // Respond with the created user (excluding password)
     res.status(201).json({
       success: true,
       message: "User registered successfully",
       user: {
         _id: user._id,
         name: user.name,
         email: user.email,
       },
     });
  } catch (error) {
    next(new AppError(500, error?.message || "Internal Server Error" ))
  }
}

const UserLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      generateToken(user, res);
      res.status(200).json({ message: "Login Successfull" });
    }
  } catch (error) {
    next(new AppError(500, error?.message || "Failed to Login"));
  }
};

const UserLogout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return next(new AppError(400, "No token provided"));
    }
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // `false`
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax", // `Strict` can block requests in some cases, `Lax` is better for authentication
    });
    res.status(200).json({ message: "logout Successful!" });
  } catch (error) {
    next(new AppError(500, error.message || "Internal Server Erorr"));
  }
};

const UserUpdateDetails = async (req, res, next) => {
  try {
    const { userId } = req.user; 
    const { name, email, address, mobileNumber } = req.body;

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, address, mobileNumber },
      { new: true, runValidators: true } // Return updated document & validate fields
    );

    if (!updatedUser) {
      return next(new AppError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User  updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    next(new AppError(500, error.message || "Internal Server Error"));
  }
};

const UserUpdatePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // Step 1: check matching
    if (newPassword !== confirmPassword) {
      return next(new AppError(400, "New password and confirm password do not match"));
    }
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return next(new AppError(400, "Old password is incorrect"));
    }

    // Step 2: Hash the new password and update the user document
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);
    user.password = newHash;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (error) {
    next(new AppError(500, error.message || "Internal Server Error"));
  }
};


const UserGet = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return next(new AppError(440, "Login First! Invalid Token"));
    }
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ ...user.toObject() });
  } catch (error) {
    next(new AppError(500, "Failed to Login" || error?.message));
  }
};
const generateToken = (user, res) => {
  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Prevents XSS attacks
    secure: process.env.NODE_ENV === "production", // `false` in development, `true` in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax", // `Strict` can block requests in some cases, `Lax` is better for authentication
    maxAge: 7 * 24 * 60 * 60 * 1000, // Seven Days
  });
};
module.exports = { UserLogin, UserLogout, UserGet, UserSignup, UserUpdateDetails, UserUpdatePassword };
