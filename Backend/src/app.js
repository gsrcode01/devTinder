const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

//middleware used to make server comfortable with the json data n middle  ware is provided by the express
app.use(express.json());
//getting json data from the end users.
app.post('/Signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User saved Succesfully")
    } catch (err) {
        res.send(400).send("Error saving the user:" + err.message);
    }



    await user.save();
    res.send("useer added successfully!");
});

//Get api to take users from the user database with a specific email.

app.get("/user", async (req, res) => {
    const userEmail = res.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail });
        if (users === 0) {
            res.status(400).send("user not found");
        }
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong.");
    }
});

//to get all the users form the database 
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(400).send("No user found");
        }
        res.send(users);
    } catch (err) {
        res.status(400).send("something went wrong.");
    }
})

//update data of all user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const body = req.body;

    const ALLOWED_UPDATE = ["age", "gender", "skills", "photourl"]
    const isUpdateAllowed = Object.keys(body).every((k) => {
        ALLOWED_UPDATE.includes(k);
    });
    if (!isUpdateAllowed) {
        return res.status(400).send("Invalid update operation");
    }

    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, body, {
            new: true,
            returnDocument: "after",
            runValidators: true,
        });
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        res.send(400).send("Error updating the user:" + err.message);
    }
});

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


