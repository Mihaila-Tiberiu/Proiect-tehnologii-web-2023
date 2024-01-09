import express from "express";
import { getProiecte } from "../dataAccess/ProiectDA.js";
import { getRecenzieByLivrabilID } from "../dataAccess/RecenzieDA.js";

const profRouter = express.Router();

// Route to get project information
profRouter.route('/getProjects').get(async (req, res) => {
    return res.json(await getProiecte());
});

// Route to get reviews for a project
profRouter.route('/getReviewsForProject/:projectId').get(async (req, res) => {
    let id = parseInt(req.params.projectId);
    return res.json(await getRecenzieByLivrabilID(id));
});

export default profRouter;
