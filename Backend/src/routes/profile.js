const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.json({ data: user });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfile(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile was updated successfully!`,
            data: loggedInUser,
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const loggedInUser = req.user;

        const isPasswordCorrect = await loggedInUser.validatePassword(currentPassword);
        if (!isPasswordCorrect) {
            throw new Error("Current password is incorrect");
        }

        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("New password is not strong enough");
        }

        const newHash = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = newHash;
        await loggedInUser.save();

        res.json({ message: "Password updated successfully!" });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;