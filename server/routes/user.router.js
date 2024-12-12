const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
  
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const password = encryptLib.encryptPassword(req.body.password);
  

  const queryText = `INSERT INTO "user" (email,first_name,last_name,password)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  const progressText = `INSERT INTO "userProgress" (id, day, step, missed_days, warning)
    VALUES ($1, 1, 0, 0, false) RETURNING id`;
  const habitsText = `INSERT INTO "dailyHabits" (user_id, date, daily_hydrate, daily_grow, daily_move, daily_focus, daily_nourish, daily_dinner) VALUES
    ($1, CURRENT_DATE, false, false, false, false, false, false)`;
    pool
    .query(queryText, [email, first_name, last_name, password])
    .then(res => {
      const userId = res.rows[0].id;
      return pool.query(progressText, [userId]);
    })
    .then(res => {
      return pool.query(habitsText, [res.rows[0].id]);
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('error registering:', err);
      res.sendStatus(500);
    });
  });

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

module.exports = router;
