const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        enum: ['ACT', 'RPG', 'STR', 'SIM', 'S&R', 'ADV', 'CAS'],
        default: 'CAS',
    },
    releaseYear: {
        type: Number,
        min: 1977,
        max: 2021,
    },
    xboxCompatability: {
        type: Boolean,
        default: false,
    },
    psCompatability: {
        type: Boolean,
        default: false,
    },
    pcCompatability: {
        type: Boolean,
        default: false,
    },
},  {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);