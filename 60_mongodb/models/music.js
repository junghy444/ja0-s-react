const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
    singer: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// 모델명s -> 컬렉션이 만들어짐
module.exports = mongoose.model("music", MusicSchema);
