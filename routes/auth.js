const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Matches the end of your frontend call: /admin/auth/signin
router.post("/signin", authController.signin);

module.exports = router;