const bcrypt = require('bcrypt');
const AdminModel = require("../models/adminModel");

const adminDataCheck = async (req, res) => {
    const { user, password } = req.body;

    // Validate input
    if (!user || !password) {
        return res.status(400).send({ msg: "Username and password are required." });
    }

    try {
        // Find admin by username
        const admin = await AdminModel.findOne({ user: user });
        if (!admin) {
            return res.status(401).send({ msg: "Invalid credentials." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send({ msg: "Invalid credentials." });
        }

        // If authentication is successful
        res.status(200).send({ msg: "Login successful", admin });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).send({ msg: "Internal server error." });
    }
};

module.exports = {
    adminDataCheck
};
