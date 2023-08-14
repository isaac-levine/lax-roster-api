const mongoose = require('mongoose')

const playerSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter a first name"]
        },
        lastName: {
            type: String,
            required: [true, "Please enter a last name"]
        },
        number: {
            type: Number,
            required: true,
            defualt: 0
            // add logic to disallow negatives or > 99
        }
    },
    {
        timestamps: true
    }
)


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;