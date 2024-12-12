const express = require('express');
const AWS = require('aws-sdk');
const pool = require('../modules/pool');  // assuming you're using a database pool for queries
const router = express.Router();

// Set up the S3 SDK
const s3 = new AWS.S3();

// Middleware to reject unauthenticated requests (if required)
const rejectUnauthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  next();
};

router.get('/:stepId', async (req, res) => {
  try {
    const { stepId } = req.params;
    console.log('stepId at router:', stepId);

    // Query the database to get the step details
    const queryText = `SELECT * FROM "steps" WHERE stepid = $1`;
    const { rows } = await pool.query(queryText, [stepId]);

    if (rows.length > 0) {
      const record = rows[0];
      const stepVideoUrl = record.step_video; // This will hold the relative path for the video
      console.log('Step video URL:', stepVideoUrl);

      // Determine the folder path based on stepId using a switch case
      let videoPath = '';
      switch (stepId) {
        case '1': // HYDRATE
          videoPath = 'BCX_Videos/Hydrate/HydrateVideo.mp4';
          break;
        case '2': // GROW
          videoPath = 'BCX_Videos/Grow/GrowVideo.mp4';
          break;
        case '3': // MOVE
          videoPath = 'BCX_Videos/Move/MoveVideo.mp4';
          break;
        case '4': // FOCUS
          videoPath = 'BCX_Videos/Focus/FocusVideo.mp4';
          break;
        case '5': // NOURISH
          videoPath = 'BCX_Videos/Nourish/NourishVideo.mp4';
          break;
          case '6': //Phase2
          videoPath = 'BCX_Videos/Phase2/Phase2Video.mp4';
          break;
        default:
          return res.status(404).send('Step video not found for the provided stepId');
      }

      // Set up the S3 signed URL parameters
      const params = {
        Bucket: 'bcxprime',  // Your S3 bucket name
        Key: videoPath,      // Path to the video in the S3 bucket based on stepId
        Expires: 60 * 60,    // URL expiration time (1 hour)
      };

      // Generate the S3 signed URL
      const signedUrl = await s3.getSignedUrlPromise('getObject', params);
      console.log('StepsSigned URL:', signedUrl);

      // Send the signed URL as the response
      res.json({ 
        videoUrl: signedUrl,
        stepData: record
    });

    } else {
      res.status(404).send('Step not found');
    }
  } catch (error) {
    console.error('Error fetching step video URL:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
