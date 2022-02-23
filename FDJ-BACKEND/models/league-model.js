const mongoose = require("mongoose");
const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  teams: [],
});
module.exports = mongoose.model("League", leagueSchema);
