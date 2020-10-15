const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    director: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("movie", MovieSchema);
