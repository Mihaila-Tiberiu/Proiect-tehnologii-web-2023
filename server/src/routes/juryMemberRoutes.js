import express from "express";
import { createRecenzie, updateRecenzie } from "../dataAccess/RecenzieDA.js";

const juryMemberRoutes = express.Router();

// Route to add personal review
juryMemberRoutes.route('/addOwnReview/:deliverableId').post(async (req, res) => {
  return res.json(await createRecenzie(req.body, req.params.deliverableId));
});

//modifica un review, verifica daca este jurat
juryMemberRoutes.route('/editOthersReview/:reviewId/:studentId').put(async (req, res) => {
  // Logic to edit reviews for other jury members
    return res.json(await updateRecenzie(req.body, req.params.reviewId, req.params.studentId));
});

export default juryMemberRoutes;
