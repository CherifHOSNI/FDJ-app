const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  players: [],
});
module.exports = mongoose.model("Team", teamSchema);
