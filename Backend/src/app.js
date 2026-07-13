const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

//middleware used to make server comfortable with the json data n middle  ware is provided by the express

app.use(express.json());
app.use(cookieParser());

//getting json data from the end users.

app.post('/Signup', async (req, res) => {
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

        await user.save();
        res.send("User saved Succesfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("invalid credentials");
        }

        const isPassValid = await user.validatePassword(password);
        if (isPassValid) {
            const token = await user.getJWT();

            res.cookie("token", token, { httpOnly: true });
            res.send("Login Successful");
        } else {
            throw new Error("invalid credentials");
        }
    } catch (err) {
        res.status(400).send("Error while logging in: " + err.message);
    }
});

app.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
    const user = req.user;
    res.send(user.firstName + " sent the connection request");
})

connectDB()
    .then(() => {
        console.log("database connection is established...");
        app.listen(3000, () => {

            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((error) => {
        console.log("Database connection failed");
        console.log(error);
    });


