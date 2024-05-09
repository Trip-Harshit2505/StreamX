const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

const likedSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    likedMovies: Array
});

const User = mongoose.model("User", userSchema);
const Liked = mongoose.model("Liked", likedSchema);

module.exports = {User, Liked};