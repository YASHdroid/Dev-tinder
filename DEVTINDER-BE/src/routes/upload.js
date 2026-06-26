const express = require("express");
const uploadRouter = express.Router();
const cloudinary = require("../utils/cloudinary");
const { UserAuth } = require("../middlewares/auth");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRouter.post("/upload/photo", UserAuth, upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) throw new Error("No file uploaded");

    // Upload buffer to cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "devtinder" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    res.json({ photoUrl: result.secure_url });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = uploadRouter;