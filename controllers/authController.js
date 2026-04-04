const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // 4. Send response matching your Redux slice expectations
    res.status(200).json({
      data: {
        token: token,
        user: {
          id: user._id,
          email: user.email,
          admin: user.admin,
          permissions: user.permissions,
        },
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};