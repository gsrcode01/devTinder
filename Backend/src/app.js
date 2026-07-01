const express = require("express");

const app = express();

app.use("/giri", (req, res) => {
    res.send("this side girdhar urf giri don u cannot  defeat me in the coding n in anything.");
})

app.use("/", (req, res) => {
    res.send("this is the starting of the project just wait for awhile u'll find crazy things here.  ");
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
// 