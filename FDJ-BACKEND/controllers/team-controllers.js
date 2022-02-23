const Team = require("../models/team-model");
const getTeamsByIDs = async (req, res) => {
  let payload = req.body.payload;
  let teams = await Team.find().where("_id").in(payload).exec();
  res.send({ payload: teams });
};
const getPlayersListInTeamID = async (req, res) => {
  let payload = req.body.payload;
  let team = await Team.findById(payload).exec();
  res.send({ payload: team.players });
};
module.exports = { getTeamsByIDs, getPlayersListInTeamID };
