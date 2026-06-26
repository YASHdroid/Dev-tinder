const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : User

    },

    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    status: {
        type: String,
        required: true,
        enum: {
            values: ["accepted", "rejected", "blocked", "ignored", "interested"],
            message: "{VALUE} is not a valid status"
        }
    }

}, {
    timestamps: true
});

const ConnectionRequestModel = mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;