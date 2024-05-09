const express = require("express");
const {addToLikedMovies, getLikedMovies, removeFromLikedMovies} = require("../controllers/liked")

const router = express.Router()

router.post("/add",addToLikedMovies)
router.get("/liked/:email", getLikedMovies)
router.put("/delete", removeFromLikedMovies)

module.exports = router;