// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10); 
    
    const newAdmin = new Admin({
      email: "admin@admin.com",
      password: hashedPassword,
      admin: true,
      permissions: [{ name: "dashboard" }, { name: "aarti" }]
    });

    await newAdmin.save();
    console.log("✅ Admin user created successfully!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();