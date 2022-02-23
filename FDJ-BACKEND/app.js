const express = require("express");
const app = express();
var routes = require("./routers/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
module.exports = app;
