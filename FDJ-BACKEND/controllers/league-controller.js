const League = require("../models/league-model");
const getLeaguesList = async (req, res, next) => {
  let payload = req.body.payload;
  let search = await League.find({
    name: {
      $regex: new RegExp("^" + payload + ".*", "i"),
    },
  }).exec();
  //limter nombre de  resultats a 10
  search = search.slice(0, 10);
  res.send({ payload: search });
};
module.exports = { getLeaguesList };
