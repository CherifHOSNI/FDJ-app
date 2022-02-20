const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    signing: {
        type: Object,
    },
    born: {
        type: Date,
    },
});


module.exports = mongoose.model('Player', playerSchema);