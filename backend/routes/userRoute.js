const express = require("express");
const {Register, Login, Logout} = require("../controllers/user");
const authenticateUser = require("../middlewares/authMiddleware")

const router = express.Router()

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(Logout)

router.get('/protectedRoute', authenticateUser, (req, res) => {
  res.json({ 
    message: 'Protected route accessed successfully',
    user: req.user 
  });
});

module.exports = router;