const mongoose = require("mongoose");
const db = mongoose.connection;
const app = require("./app");
mongoose.connect("mongodb://localhost/fdj-database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on("error", (error) => console.log(error));
db.once("open", () => {
  app.listen(3000, () => {
    console.log("Server has strated on PORT 3000");
  });
  console.log("Connected");
});
