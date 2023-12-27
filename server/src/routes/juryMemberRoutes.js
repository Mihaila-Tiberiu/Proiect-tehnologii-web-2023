const express = require('express');
const router = express.Router();

const db = require('../../database');

// Route to choose chief member of jury
router.put('/chooseChiefMemberOfJury/:projectId', (req, res) => {
  // Logic to choose chief member of jury
});

// Route to choose jurors for a project
router.put('/chooseJurors/:projectId', (req, res) => {
  // Logic to choose jurors for a project
});

// Special functionalities for the chief member of jury
router.post('/addOthersReview/:projectId', (req, res) => {
  // Logic to add reviews for other jury members
});

router.put('/editOthersReview/:projectId/:reviewId', (req, res) => {
  // Logic to edit reviews for other jury members
});

module.exports = router;
