// utils/AppError.js

class AppError extends Error {
  constructor(statusCode = 500, message = "Something went wrong!", data = {}) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Identifies known (handled) errors
    
    // Captures clean stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports =  AppError ;
