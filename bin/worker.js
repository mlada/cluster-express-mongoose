require("dotenv").config();
const express = require("express");
const {
  formBP,
  jsonBP,
  static,
  cookieParser,
  sessionConfig
} = require("./config");
const app = express();
const path = require("path");

const router = require("../controllers");
const errorHandler = require("./helpers/errorHandler");
// все настройки для удобства вынесла в отдельный модуль

const es6Renderer = require("express-es6-template-engine");
app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

app
  .use(static)
  .use(cookieParser)
  .use(sessionConfig)
  .use(jsonBP)
  .use(formBP);

app.use("/", require("../controllers/home"));
app.use("/login", router.login);
app.use("/post", router.post);

// обработчик вызывается непосредственно перед запуском сервера
app.use(errorHandler);

app.listen(process.env.PORT, err => {
  if (err) console.error(err);
  else console.log(`Running server at port ${process.env.PORT}!`);
});
