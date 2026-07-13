const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bycrpt");

authRouter.post('/signup', async (req, res) => {
    //Validation of the data provided
    validateSignUpData(req);
    const { password } = req.body;

    //encryption of the password
    const hashpass = bcrypt.hash(password, 10);

    //creating a new instance of the user model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: hashpass,
    });

    try {
        await user.save();
        res.send("User saved Succesfully")
    } catch (err) {
        res.send(400).send("Error saving the user:" + err.message);
    }



    await user.save();
    res.send("useer added successfully!");
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
            throw new error("invalid credentials")
        }

    } catch (err) {
        res.status(400).send("Error while logging in");
    }
});

module.exports = authRouter;