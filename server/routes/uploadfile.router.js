const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const router = express.Router();

const s3 = new AWS.S3();


// Set up Multer storage (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle photo upload
router.post("/upload", upload.single("file"), (req, res) => {
  const { user_id, day } = req.body;  // Extract user_id and day from the form data
  const file = req.file;  // The uploaded file

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const fileName = `user_${user_id}/day_${day}/${Date.now()}_${file.originalname}`;

  // Set up S3 upload parameters
  const params = {
    Bucket: 'bcxprime', // S3 bucket name
    Key: fileName,      // Path within the bucket (e.g., "uploads/filename")
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  // Upload file to S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading file to S3:", err);
      return res.status(500).send("Error uploading file to S3.");
    }

    // Return the URL of the uploaded file
    res.status(200).send({
      message: "File uploaded successfully.",
      fileUrl: data.Location,  // URL of the uploaded file in S3
    });
  });
});

module.exports = router;
