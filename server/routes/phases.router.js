const express = require('express');
const AWS = require('aws-sdk');
const pool = require('../modules/pool');  // assuming you're using a database pool for queries
const router = express.Router();
const s3 = new AWS.S3();

// Middleware to reject unauthenticated requests (if required)
const rejectUnauthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  next();
};

// Route to get video URL
router.get('/intro-video-url', async (req, res) => {
  try {
    const phaseId = 1;  // Hardcoding phaseId as 1, but you can get it from req.query or req.params
    if (!phaseId) {
      return res.status(400).send('phaseId is required');
    }

    // Query to fetch the intro video URL from the database
    const queryText = `SELECT intro_video FROM "phases" WHERE id = $1;`;
    const { rows } = await pool.query(queryText, [phaseId]);

    if (rows.length > 0) {
      const introVideoUrl = rows[0].intro_video;  // Correct field name in the database
      //console.log('Intro video URL at router:', introVideoUrl);

      // Set up S3 signed URL parameters
      const params = {
        Bucket: 'bcxprime',  // Your S3 bucket name
        Key: introVideoUrl,  // Path to the video in the S3 bucket
        Expires: 60 * 60,    // URL expiration time (1 hour)
      };

      // Generate the S3 signed URL 
      const signedUrl = await s3.getSignedUrlPromise('getObject', params);
      //console.log('Signed URL:', signedUrl);

      // Send the signed URL as the response
      res.json({ videoUrl: signedUrl });
    } else {
      res.status(404).send('Phase not found');
    }
  } catch (error) {
    console.error('Error fetching video URL:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/completion-video-url', async (req, res) => {
  try {
    const phaseId = 1;  // Hardcoding phaseId as 1, but you can get it from req.query or req.params
    if (!phaseId) {
      return res.status(400).send('phaseId is required');
    }

    // Query to fetch the intro video URL from the database
    const queryText = `SELECT completion_video FROM "phases" WHERE id = $1;`;
    const { rows } = await pool.query(queryText, [phaseId]);

    if (rows.length > 0) {
      const introVideoUrl = rows[0].intro_video;  // Correct field name in the database
      console.log('Intro video URL at router:', introVideoUrl);

      // Set up S3 signed URL parameters
      const params = {
        Bucket: 'bcxprime',  // Your S3 bucket name
        Key: introVideoUrl,  // Path to the video in the S3 bucket
        Expires: 60 * 60,    // URL expiration time (1 hour)
      };

      // Generate the S3 signed URL 
      const signedUrl = await s3.getSignedUrlPromise('getObject', params);
      console.log('Signed URL:', signedUrl);

      // Send the signed URL as the response
      res.json({ videoUrl: signedUrl });
    } else {
      res.status(404).send('Phase not found');
    }
  } catch (error) {
    console.error('Error fetching video URL:', error);
    res.status(500).send('Internal Server Error');
  }


});


module.exports = router;
