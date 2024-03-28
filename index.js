const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
// const multer = require("multer");
const session = require("express-session");
const cors = require('cors');
var app = express();


app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(multer({ dest: "uploads/" }).single("image"));
app.use(methodOverride((req) => {
    console.log(req.headers["content-type"]);
    console.log(req.body);
    console.log(req.files);
    return req.body._method;
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "asdlkf.fdgskljpoefcsdffęėčęč",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);

const UserRouter = require('./routes/UserRouter');
app.use('/users', UserRouter);
const LogosRouter = require('./routes/LogosRouter');
app.use('/users/:id/');

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(8000);

module.exports = app;