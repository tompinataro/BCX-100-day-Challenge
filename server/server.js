const express = require('express');
const cors = require('cors');  // Import the CORS middleware
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const userProgress = require('./routes/userprogress.router');
const userImage = require('./routes/userimage.router');
const phasesRouter = require('./routes/phases.router');  

// Enable CORS middleware before your routes
const corsOptions = {
  origin: 'http://localhost:5173',  // This is your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use CORS middleware globally for all routes
app.use(cors(corsOptions));

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/userprogress', userProgress);
app.use('/api/userImage', userImage);
app.use('/api/phases', phasesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
