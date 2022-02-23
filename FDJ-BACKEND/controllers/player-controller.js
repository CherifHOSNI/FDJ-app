const Player = require("../models/player-model");
const getPlayerByID = async (req, res) => {
  let payload = req.body.payload;
  let players = await Player.find().where("_id").in(payload).exec();
  res.send({ payload: players });
};
module.exports = { getPlayerByID };
