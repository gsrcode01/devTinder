const jwt = require("jsonwebtoken");



const userAuth = async (req, res, next) => {
    //read the token from the user the req cookies
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new error("Token is not valid!!");
        }

        const decodeObj = await jwt.verfy(token, "devTinder@159");

        const { _id } = decodeObj;
        const user = await User.findBy(_id);
        if (!user) {
            throw new error("User not found");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }

    //validate the token

    //find the user

};

module.exports = { userAuth, };