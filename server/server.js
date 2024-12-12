const express = require('express');
const cors = require('cors');  // Import the CORS middleware
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const app = express();
const pool = require('./modules/pool');
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
const stepsRouter = require('./routes/steps.router');
const uploadRouter = require ('./routes/uploadfile.router');

// Enable CORS middleware before your routes
const corsOptions = {
  origin: 'http://localhost:5173',  // This is your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use CORS middleware globally for all routes
app.use(cors(corsOptions));

//Email transporter
//TODO: REPLACE WITH .ENV SETTINGS
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'bcxreminder@gmail.com',
    pass: 'cgns qzln hkis iwsx',
  },
});

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
app.use('/api/steps', stepsRouter);
app.use('/api/upload', uploadRouter);

cron.schedule('0 * * * *', async () => {

  const now = new Date();
  const nowHours = now.getUTCHours();
  const reminderHours = (now.getUTCHours() + 4) % 24 //wrap around if they go above 24
  console.log('running hourly job for', now);
  console.log('current hour is', nowHours);
  console.log('four hours from now =', reminderHours);

  try {
    runReminders(reminderHours);
    runEndOfDay(nowHours);
  } catch (err) {console.log('error running reminders or end of day!', err)};

})

//job needs to: get all users whose day ends in 4 hours, check if they have their daily habits done, send them an email, get all users whose day ends now, check if their habits are done, set them to warning if not
  /*
select "user".id, email, first_name, step, daily_hydrate, daily_grow, daily_move, daily_focus, daily_nourish,daily_dinner
from "user" 
join userProgress on "user".id = userProgress.id 
join dailyHabits on "user".id = dailyHabits.user_id 
where 
"dayEndTime" = '2:00:00' and 
notify = true and 
challenge_complete = false
*/

async function runReminders(reminderHours) {
  //get users whose dayEndTime is 4 hours from now, check their daily habits
  const reminderQueryText = `
    SELECT u.id, u.email, u.first_name, u."dayEndTime", u.notify, up.step
    FROM "user" u
    JOIN "userProgress" up ON u.id = up.id
    WHERE u."dayEndTime" = $1 AND u.notify = true
    AND (
    SELECT 
        CASE WHEN dh.daily_hydrate THEN 1 ELSE 0 END +
        CASE WHEN dh.daily_grow THEN 1 ELSE 0 END +
        CASE WHEN dh.daily_move THEN 1 ELSE 0 END +
        CASE WHEN dh.daily_focus THEN 1 ELSE 0 END +
        CASE WHEN dh.daily_nourish THEN 1 ELSE 0 END +
        CASE WHEN dh.daily_dinner THEN 1 ELSE 0 END
      FROM "dailyHabits" dh 
      WHERE dh.user_id = 1
    ) < up.step;`

  const reminderResponse = await pool.query(reminderQueryText, [reminderHours]); //replace 8 with reminderHours
  for(const user of reminderResponse.rows) {
    console.log('sending email to', user.email)
    await sendReminderEmail(user.email, user.first_name);
  }
}

async function sendReminderEmail(userEmail, first_name){
  const mailSettings = {
    from:'bcxreminder@gmail.com',
    to: userEmail,
    subject: 'Reminder: Mark your daily habits completed!',
    text: `Hey ${first_name}, just a quick reminder that you haven't marked your daily habits off on the BCX 100 web-app! to avoid losing your progress, make sure to log on and complete each of your habits in the next four hours. You can do it!`,
  };
  try{
    await transporter.sendMail(mailSettings);
    console.log(`sent reminder to ${userEmail}`);
  } catch(err) {
    console.log('Error sending email!!', err);
  }
}

async function runEndOfDay(currentHourUtc) {
  try {
    const res = await pool.query(`
      SELECT u.id, u.email, u."dayEndTime", up.step, up.warning
      FROM "user" u
      JOIN "userProgress" up ON u.id = up.id
      WHERE u."dayEndTime" = $1
    `, [currentHourUtc]);

    for(const user of res.rows) {
      const habitsCompleted = (checkHabits(user.id) >= user.step);
      if (!habitsCompleted) {
        console.log(`user ${user.id} didn't complete their habits!`);
        if(user.warning){
          punishUser(user.id);
        }
        else {
          warnUser(user.id);
        }
      } else {
        //habits were completed
        increaseDayForUser(user.id);
      }
      resetHabitsForUser(user.id);
    }
  } catch (err) {console.log('error running end of day!!', err)}
}

async function checkHabits(userId) {
  const habitRes = await pool.query(`
    SELECT 
      CASE WHEN dh.daily_hydrate THEN 1 ELSE 0 END +
      CASE WHEN dh.daily_grow THEN 1 ELSE 0 END +
      CASE WHEN dh.daily_move THEN 1 ELSE 0 END +
      CASE WHEN dh.daily_focus THEN 1 ELSE 0 END +
      CASE WHEN dh.daily_nourish THEN 1 ELSE 0 END +
      CASE WHEN dh.daily_dinner THEN 1 ELSE 0 END
      AS total
    FROM "dailyHabits" dh
    WHERE dh.user_id = $1
  `, [userId]);
  return habitRes.rows[0].total;
}

async function punishUser(userId){
  const missedDayRes = await pool.query(`SELECT missed_days FROM userProgress WHERE id = $1`, [userId]);
  const missedDays = missedDayRes.rows[0].missed_days;
  if(missedDays === 2){
    console.log(`user ${userId} missed 3 days!`)
    await pool.query(`UPDATE userProgress SET day=1, step = 1, missed_days = 0 WHERE id = $1`, [userId]);
  }
  else{
    await pool.query(`UPDATE userProgress
      SET day = CASE 
            WHEN (step - 1) * 10 = 0 THEN 1
            ELSE (step - 1) * 10
          END, 
      missed_days = missed_days + 1`);
  }
}

async function warnUser(userId){
  await pool.query(`UPDATE userProgress SET warning=true WHERE id = $1`, [userId]);
}

async function resetHabitsForUser(userId) {
  await pool.query(`
    UPDATE "dailyHabits"
    SET daily_hydrate = false, daily_grow = false, daily_move = false, 
        daily_focus = false, daily_nourish = false, daily_dinner = false
    WHERE user_id = $1
  `, [userId]);
}

async function increaseDayForUser(userId) {
  const res = await pool.query(`
      UPDATE "userProgress"
      SET day = day + 1
      WHERE id = $1
      RETURNING day
    `, [userId]);
  
  const newDay = res.rows[0].newDay

  if (newDay % 10 === 0) {
    const newStep = Math.min(((newDay / 10) + 1), 6); //set step to correct value, either i.e. step 2 for day 10, or step 6 if new day > 50
    await pool.query(`
        UPDATE "userProgress"
        SET step = $2
        WHERE id = $1
      `, [userId, newStep]);
  }
}

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
