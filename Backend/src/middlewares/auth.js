const jwt = require("jsonwebtoken");
const User = require("../models/user");



const userAuth = async (req, res, next) => {
    try {
        let token = req.cookies?.token;
        if (!token && req.headers?.authorization) {
            token = req.headers.authorization.replace("Bearer ", "");
        }
        if (!token && req.headers?.token) {
            token = req.headers.token;
        }

        if (!token) {
            return res.status(401).send("Error: Token is not valid or missing!");
        }

        const decodeObj = await jwt.verify(token, "devTinder@159");

        const { _id } = decodeObj;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send("Error: User not found");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send("Error: " + err.message);
    }
};

module.exports = { userAuth, };