const express = require("express");
const requestsRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

requestsRouter.post(
    "/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
        try {
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;

            const allowedStatus = ["interested", "ignored"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ message: "Invalid status type: " + status });
            }

            const toUser = await User.findById(toUserId);
            if (!toUser) {
                return res.status(404).json({ message: "User not found!" });
            }

            const existingUserConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId },
                ],
            });
            if (existingUserConnectionRequest) {
                return res
                    .status(400)
                    .json({ message: "Connection request already exists!" });
            }

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });

            const data = await connectionRequest.save();

            res.json({
                message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
                data: data,
            });
        } catch (err) {
            res.status(400).send("Error: " + err.message);
        }
    }
);

requestsRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;
            const { status, requestId } = req.params;

            const allowedStatus = ["accepted", "rejected"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ message: "Invalid status type: " + status });
            }

            const connectionRequest = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId: loggedInUser._id,
                status: "interested",
            });
            if (!connectionRequest) {
                return res
                    .status(404)
                    .json({ message: "Connection request not found" });
            }

            connectionRequest.status = status;
            const data = await connectionRequest.save();

            res.json({ message: "Connection request " + status, data });
        } catch (err) {
            res.status(400).send("Error: " + err.message);
        }
    }
);

module.exports = requestsRouter;

