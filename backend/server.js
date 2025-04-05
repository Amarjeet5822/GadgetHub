const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/dbConnection.js");
const AppError = require("./utils/AppError.js");
const routes = require("./routes/indexRoute.js");
const { IsUserAuthenticated } = require("./middleware/authMiddleware.js");

dotenv.config();

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const cookieParserSecret = process.env.SECRET_KEY;
app.use(cookieParser(cookieParserSecret));
const whitelist = [process.env.FE_URL, process.env.DEPLOY_FE_URL];

const corsOptionsDelegate = (req, callback) => {
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    callback(null, {
      origin: req.header("Origin"), //// Automatically reflects the request's origin if in the whitelist
      credentials: true,
      methods: "GET,HEAD,PATCH,POST,PUT,DELETE",
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    }); // reflect (enable) the requested origin in the CORS response
  } else {
    callback(null, {origin: false}); // Deny CORS if not in whitelist
  }
};
app.use(cors(corsOptionsDelegate));

app.use( routes);


app.get("/auth/status", IsUserAuthenticated, (req, res, next) => {
  try {
    res.status(200).json({isAuthenticated: true});
  } catch (error) {
    next(new AppError(500, error?.message || "Failed to get Status",{ isAuthenticated: false}))
  }
});

app.use((req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    data: err.data,
  });
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  connectDB();
  console.log( `app running at http://localhost:${PORT}`)
});