const express = require('express');
const router = express.Router();

// Route to create a new student account
router.post('/createUserStudent', (req, res) => {
  // Logic to create a student account
});

// Route to create a new professor account
router.post('/createUserProf', (req, res) => {
  // Logic to create a professor account
});

// Route to log in a student
router.post('/loginStudent', (req, res) => {
  // Logic to login a student
});

// Route to log in a professor
router.post('/loginProf', (req, res) => {
  // Logic to login a professor
});

module.exports = router;
