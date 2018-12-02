const mongoose = require("mongoose");
require("dotenv").config();
// заменяем стандартную библиотеке на bluebird
mongoose.Promise = require("bluebird");
mongoose.set("useCreateIndex", true);

mongoose.connect(
  process.env.DB_HOST + process.env.DB_NAME,
  {
    poolSize: 2,
    useNewUrlParser: true,
    promiseLibrary: global.Promise
  }
);

mongoose.connection.on("error", err => {
  console.error("Database Connection Error: " + err);
  console.error("Админ сервер MongoDB Запусти!");
  process.exit(2);
});

mongoose.connection.on("connected", () => {
  console.info("Succesfully connected to MongoDB Database");
});
