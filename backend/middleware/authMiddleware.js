const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const comparePass = async (user, pass) => {
  try {
    return await bcrypt.compare(pass, user.password); 
  } catch (error) {
    return false; 
  }
};

const SignupMiddleware = async (req, res, next ) => {
  const { email, password, confirmPassword, name } = req.body;
  if (!email || !password || !confirmPassword || !name) {
    return next(new AppError(400, "Missing Fields"))
  }
  if(password.length < 6 ) {
    return next(new AppError(400, "Password length > 5"))
  }
  const user = await User.findOne({ email })
  if (user ) {
    return next(new AppError(400, "Already exist, Login Please"))
  }
  if( password !== confirmPassword ) {
    return next(new AppError(400, "Mismatch Password"))
  }else {
    next()
  }
}

const LoginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const currUser = await User.findOne({ email });
    if (!currUser) {
      return next(new AppError(404, "Login First! User not Found"));
    }
    if (comparePass(currUser, password)) {
      next();
    } else {
      return next(new AppError(40));
    }
  } catch (error) {
    next(new AppError(500, error?.message || "Internal Server Error"));
  }
};

const LogoutMiddleware = async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return next(new AppError(400, "Invalid Token! Login first"));
  }
  next();
};

const IsUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return next(new AppError(401, "Please Login First!"));
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return next(new AppError(401, "Please Login First!"));
      }
      req.user = decoded; // { userId, email } = payload
      next();
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

module.exports = {
  IsUserAuthenticated,
  LoginMiddleware,
  SignupMiddleware,
  LogoutMiddleware,
};
