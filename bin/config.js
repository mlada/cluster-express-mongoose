require("./dbinit");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")();
const static = ("/public", express.static(path.join(__dirname, "../public")));
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const jsonBP = bodyParser.json({
  limit: "10kb"
});
const formBP = bodyParser.urlencoded({
  extended: true
});
const sessionConfig = session({
  secret: "oh my god",
  resave: false,
  saveUninitialized: true,
  // Использовать монго хранилище
  store: new MongoStore({ mongooseConnection: require("mongoose").connection })
});

module.exports = {
  jsonBP,
  formBP,
  static,
  cookieParser,
  sessionConfig
};
