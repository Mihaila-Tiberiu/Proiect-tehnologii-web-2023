import express from "express";
import { chooseJury } from "../dataAccess/StudentiDA.js";

const juryMemberRoutes = express.Router();

// Route to choose chief member of jury
juryMemberRoutes.route('/chooseChiefMemberOfJury/:projectId').put(async (req, res) => {
  // Logic to choose chief member of jury
});

// Route to choose jurors for a project
juryMemberRoutes.route('/chooseJurors/:projectId').put(async (req, res) => {
  return res.json(await chooseJury(req.params.projectId));
});

// // Special functionalities for the chief member of jury
// router.post('/addOthersReview/:projectId', (req, res) => {
//   // Logic to add reviews for other jury members
// });

// router.put('/editOthersReview/:projectId/:reviewId', (req, res) => {
//   // Logic to edit reviews for other jury members
// });

export default juryMemberRoutes;
