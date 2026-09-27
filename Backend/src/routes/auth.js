const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post('/signup', async (req, res) => {
    try {
        //Validation of the data provided
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;

        //encryption of the password
        const hashpass = await bcrypt.hash(password, 10);

        //creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashpass,
        });

        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token", token, { httpOnly: true });
        res.json({
            message: "User saved successfully!",
            token: token,
            data: savedUser,
        });
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPassValid = await user.validatePassword(password);
        if (isPassValid) {
            const token = await user.getJWT();

            res.cookie("token", token, { httpOnly: true });
            res.json({
                message: "Login Successful",
                token: token,
                data: user,
            });
        } else {
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        res.status(400).send("Error while logging in: " + err.message);
    }
});

authRouter.post('/logout', async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.json({ message: "Logout Successful!!" });
});



module.exports = authRouter;