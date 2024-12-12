const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");


router.get("/:id", rejectUnauthenticated, (req, res) => {
  const userId = req.params.id; // Get the ID from the URL
  //console.log('user id before query executes at router', userId);
  const queryText = 'SELECT * FROM "userProgress" WHERE id = $1;';
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

router.post('/setstep', (req, res) => {
  try{
    const passedId = req.body.id;
    const passedStep = req.body.step;
    const setStepQuery = `UPDATE "userProgress" SET step = $2 WHERE id = $1`;
    pool.query(setStepQuery, [passedId, passedStep])
    .then(res.sendStatus(201))
    .catch((err) => {console.log('error setting step', err)});
  } catch (err) {console.log('error running set route step', err)};
})

router.post('/setHabit', (req, res) => {
  const changedHabit = req.body.habit;
  const changeTF = req.body.truefalse;
  const changedUser = req.body.id;
  const allowedHabits = ['daily_hydrate', 'daily_grow', 'daily_move', 'daily_focus', 'daily_nourish', 'daily_dinner'];
  if (!allowedHabits.includes(changedHabit)){res.sendStatus(403)}
  else{
    const changeHabitQuery = `UPDATE "dailyHabits" SET "${changedHabit}" = $1 WHERE user_id = $2`;
    pool.query(changeHabitQuery, [changeTF, changedUser])
    .then(console.log('set habit!'))
    .then(res.sendStatus(201))
    .catch((err)=> {console.log('error changing habit', err)})
  }
  
})
module.exports = router;