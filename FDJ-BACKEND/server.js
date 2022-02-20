const express = require('express');
const League = require('./schemas/League');
const Team = require('./schemas/Team');
const Player = require('./schemas/Player');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fdj-database', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {
    console.log('Connected')
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/getLeagues', async (req, res) => {
    let payload = req.body.payload;
    let search = await League.find({
        name: {
            $regex: new RegExp('^' + payload + '.*', 'i')
        }
    }).exec();
    //limter nombre de  resultats a 10
    search = search.slice(0, 10);
    res.send({ payload: search });
})

app.post('/getTeams', async (req, res) => {
    let payload = req.body.payload;
    let teams = await Team.find().where('_id').in(payload).exec();
    console.log(teams);
    res.send({ payload: teams });
})
app.post('/getTeamPlayersIDs', async (req, res) => {
    let payload = req.body.payload;
    let team = await Team.findById(payload).exec();
    res.send({ payload: team.players });
})

app.post('/getPlayers', async (req, res) => {
    let payload = req.body.payload;
    let players = await Player.find().where('_id').in(payload).exec();
    res.send({ payload: players });
})

app.listen(3000, () => {
    console.log('Server has strated on PORT 3000')
})