var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var models = require("./models");
var cors = require("cors");

const apiRouter = require("./routes");

var app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client-react/build")));
app.use(cors());

app.get('/', (req, res) => {
  if (process.env.NODE_ENV === "production") {}

  res.status(200).sendFile(path.join(__dirname, "../client-react/build/index.html"));
});

app.use("/api", apiRouter);

app.use(function ({ error }, req, res, next) {
  if (!error) next();
  
  console.error("error", error);
  // write error to log if created and create if not

  res.status(500).end("Something broke!");
});

app.use(function (req, res, next) {
  const tag = req.url.split(".")[1]
  console.log(tag)
  if (tag === "ico") res.status(200).end();
  else res.status(404).end();
});

models.sequelize.sync().then(() => {
  console.log(models.sequelize.models)
  console.log("DB Sync'd up");
});

module.exports = app;
