const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

// Serialize user into session (based on the user ID)
passport.serializeUser((user, done) => {
  done(null, user.id); // Stores the user ID in the session
});

// Deserialize user from session (retrieve the user by their ID)
passport.deserializeUser((id, done) => {
  pool
    .query('SELECT * FROM "user" WHERE id = $1', [id]) // Query the user by their ID
    .then((result) => {
      const user = result && result.rows && result.rows[0];

      if (user) {
        delete user.password; // Remove password from the response
        done(null, user); // Return the user object (without the password) to the session

      } else {
        done(null, null); // No user found
      }
    })
    .catch((error) => {
      console.log('Error with query during deserializing user: ', error);
      done(error, null); // Return the error if the query fails
    });
});

// Define the strategy for logging in with email and password
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email', // Tell Passport to use 'email' instead of 'username'
      passwordField: 'password', // Default password field (no change needed)
    },
    (email, password, done) => {
      pool
        .query('SELECT * FROM "user" WHERE email = $1', [email]) // Query for the user by email
        .then((result) => {
          const user = result && result.rows && result.rows[0];

          if (user && encryptLib.comparePassword(password, user.password)) {
            // If user is found and password is correct
            done(null, user); // Proceed with the login
          } else {
            // Invalid email or password
            done(null, false, { message: 'Invalid email or password' });
          }
        })
        .catch((error) => {
          console.log('Error with query for user: ', error);
          done(error, null); // Return the error if the query fails
        });
    }
  )
);

module.exports = passport;
