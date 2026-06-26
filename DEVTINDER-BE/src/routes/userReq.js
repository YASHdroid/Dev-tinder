const express = require("express");
const { UserAuth } = require("../middlewares/auth");

const userRouter = express.Router();

const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

// Requests Received
userRouter.get(
  "/user/requests/recieved",
  UserAuth,
  async (req, res) => {
    try {

      const loggedInUser = req.user;

      const requests =
        await ConnectionRequest.find({

          toUserId:
            loggedInUser._id,

          status:
            "interested"

        })

        .populate(
          "fromUserId",
          [
            "firstName",
            "lastName",
            "photoUrl",
            "about"
          ]
        );

      res.json({
        message:
          "Data fetched successfully",

        data:
          requests
      });

    }

    catch (err) {

      res.status(400).json({
        message:
          "ERROR: " +
          err.message
      });

    }
  }
);

// Connections
userRouter.get(
  "/user/connections",
  UserAuth,
  async (req, res) => {

    try {

      const loggedInUser =
        req.user;

      const connections =
        await ConnectionRequest.find({

          $or: [

            {
              toUserId:
                loggedInUser._id,

              status:
                "accepted"
            },

            {
              fromUserId:
                loggedInUser._id,

              status:
                "accepted"
            }

          ]

        })

        .populate(
          "fromUserId",
          [
            "firstName",
            "lastName",
            "photoUrl",
            "about"
          ]
        )

        .populate(
          "toUserId",
          [
            "firstName",
            "lastName",
            "photoUrl",
            "about"
          ]
        );

      const data =
        connections.map(
          (row) => {

            if (
              row.fromUserId._id.toString() ===
              loggedInUser._id.toString()
            ) {
              return row.toUserId;
            }

            return row.fromUserId;

          }
        );

      res.json({

        message:
          "Connections fetched successfully",

        data

      });

    }

    catch (err) {

      res.status(400).json({

        message:
          "ERROR: " +
          err.message

      });

    }

  }
);

// user/feed
userRouter.get("/user/feed", UserAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Find ALL connection requests involving the logged-in user
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id },
      ],
    }).select("fromUserId toUserId");

    // Build a set of user IDs to hide from feed
    const hideUsersFromFeed = new Set();
    hideUsersFromFeed.add(loggedInUser._id.toString());

    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    })
      .select("firstName lastName photoUrl about age gender") // don't expose password hash
      .skip(skip)
      .limit(limit);

    if (users.length === 0) {
      return res.status(200).json({
        message: "No more users in feed",
        page,
        limit,
        results: 0,
        data: [],
      });
    }

    res.status(200).json({
      message: "Feed fetched successfully",
      page,
      limit,
      results: users.length,
      data: users,
    });

  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
});

module.exports =
userRouter;