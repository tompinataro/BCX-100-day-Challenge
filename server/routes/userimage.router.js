const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");


router.post("/", rejectUnauthenticated, (req, res) => {
    console.log('Incoming image data:', req.body); 
    const { user_id, initial_photo } = req.body; 
    const queryText =
        'INSERT INTO "userImage"(user_id, initial_photo) VALUES ($1, $2);';
    const params = [user_id, initial_photo];
    
    pool.query(queryText, params)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log("Error adding Initial image:", error);
            res.sendStatus(500);
        });
});


  module.exports = router;