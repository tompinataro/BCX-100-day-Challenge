const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const userProgress =require('./routes/userprogress.router')
const userImage = require('./routes/userimage.router');  


// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/userprogress',userProgress);
app.use('/api/userImage', userImage );

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

//For S3 CORS
const cors = require('cors');

// Allow requests from the frontend (localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173',  // Change this to match your frontend's URL
  methods: ['GET', 'POST'],    //Allow GET and POST methods
  allowedHeaders: ['Content-Type', 'Authorization']    
}));

const uploadRouter = require('./routes/uploadfile.router.js');
app.use('/upload',uploadRouter );  // Use the route /upload for file uploads  

// Register your route
app.use('/api', uploadRouter);
