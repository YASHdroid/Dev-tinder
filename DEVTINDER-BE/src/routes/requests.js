const express = require("express");
const requestRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", UserAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;   

    const allowedStatus = ["ignored" ,"interested"];

    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message: "Invalid Status type :" +status
      })
    }

    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({
        message: "User not found"
      })
    }
    // if there is already connection req
// prevent duplicate requests
const existingConnectionRequest =
await ConnectionRequest.findOne({

$or:[

{
fromUserId,
toUserId
},

{
fromUserId:toUserId,
toUserId:fromUserId
}

]

});

// allow ignored requests again
if(
existingConnectionRequest &&
existingConnectionRequest.status !== "ignored"
){

return res.status(400).json({
message:"Connection request already exists"
});

}

// delete ignored request
if(
existingConnectionRequest &&
existingConnectionRequest.status==="ignored"
){

await ConnectionRequest.findByIdAndDelete(
existingConnectionRequest._id
);

}

    const connectionRequest = new ConnectionRequest({

      fromUserId , toUserId,status
      });

    const data = await connectionRequest.save();

    res.json({
   message: `${req.user.firstName} sent a ${status} request to ${toUser.firstName}`,
      data
    });

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

requestRouter.post("/request/review/:status/:requestId", UserAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const { status, requestId } = req.params;
    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid Status"
      });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested" // fixed
    });

    if (!connectionRequest) {
      return res.status(404).json({   // added return
        message: "Connection not Found"
      });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({   // fixed response
      message: "Connection request " + status,
      data: data
    });

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});
module.exports = requestRouter;