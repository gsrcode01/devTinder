const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post('/signup', async (req, res) => {
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

    try {
        await user.save();
        res.send("User saved Succesfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!emailId) {
            throw new Error("invalid credenttials ")
        }

        const isPassValid = await user.validatePassword(password);
        if (isPassValid) {

            const token = await user.getJWT();

            res.cookie("token", token, { httpOnly: true });

            res.send("Login Successful");
        } else {
            throw new Error("invalid credentials")
        }

    } catch (err) {
        res.status(400).send("Error while logging in: " + err.message);
    }
});

module.exports = authRouter;