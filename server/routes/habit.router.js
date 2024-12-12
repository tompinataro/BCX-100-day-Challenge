// routes/habits.router.js
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for daily habits
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const queryText = `
      SELECT habit_name, completed, total
      FROM dailyHabits
      WHERE user_id = $1;
    `;
    const result = await pool.query(queryText, [userId]);
    res.send(result.rows);
  } catch (err) {
    console.error('Error fetching daily habits', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
