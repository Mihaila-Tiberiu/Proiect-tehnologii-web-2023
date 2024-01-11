import express from "express";
import { chooseJury } from "../dataAccess/StudentiDA.js";
import { createRecenzie, updateRecenzie } from "../dataAccess/RecenzieDA.js";

const juryMemberRoutes = express.Router();

// // Special functionalities for the chief member of jury
// router.post('/addOthersReview/:projectId', (req, res) => {
//   // Logic to add reviews for other jury members
// });

// Route to add personal review
juryMemberRoutes.route('/addOwnReview/:deliverableId/:studId').post(async (req, res) => {
  return res.json(await createRecenzie(req.body, req.params.deliverableId, req.params.studId));
});


//modifica un review, verifica daca este jurat
juryMemberRoutes.route('/editOthersReview/:reviewId/:studentId').put(async (req, res) => {
  // Logic to edit reviews for other jury members
    return res.json(await updateRecenzie(req.body, req.params.reviewId, req.params.studentId));
});

export default juryMemberRoutes;
