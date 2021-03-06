const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, default: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String,
    visible: {
        type: Boolean,
        default: true,
    }
  }, {
    timestamps: true
});

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
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    releaseYear: {
        type: Number,
        min: 1900,
        max: 2021,
    },
    xboxCompatibility: {
        type: Boolean,
        default: false,
    },
    psCompatibility: {
        type: Boolean,
        default: false,
    },
    pcCompatibility: {
        type: Boolean,
        default: false,
    },
    reviews:
        [reviewSchema]
    ,
},  {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);