const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");

// Mount the auth routes to /admin/auth
router.use("/api/admin/auth", authRoutes);

module.exports = router;