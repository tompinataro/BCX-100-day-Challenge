const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");


router.get("/:id", rejectUnauthenticated, (req, res) => {
  const userId = req.params.id; // Get the ID from the URL
  //console.log('user id before query executes at router', userId);
  const queryText = 'SELECT * FROM "userProgress" WHERE user_id = $1;';
  // Query to get the specific product
  const values = [userId]; // Parameterized query to prevent SQL injection

  pool
    .query(queryText, values)
    .then((results) => {
      // Log the result rows to the console
      //console.log('Query results:', results.rows);  // Log the results rows here

      res.send(results.rows);  // Send back the query results to the client
    })
    .catch((error) => {
      console.log("Error making GET for items:", error);
      res.sendStatus(500); // Send an error response
    });
});
module.exports = router;