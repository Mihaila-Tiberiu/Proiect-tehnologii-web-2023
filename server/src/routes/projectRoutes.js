import express from "express";
import { createProiect, getProiecte, updateProiect } from "../dataAccess/ProiectDA.js";
import { createLivrabil, getLivrabileById, updateLivrabil } from "../dataAccess/LivrabilDa.js";
import { associateStudent } from "../dataAccess/StudentiDA.js";
import { createRecenzie } from "../dataAccess/RecenzieDA.js";

const projectRoutes = express.Router();

// Route to create a new project
projectRoutes.route('/createProject').post(async (req, res) => {
    return res.json(await createProiect(req.body));
});

projectRoutes.route('/allProjects').get(async (req, res) => {
    return res.json(await getProiecte());
})

// // Route to join an existing project
projectRoutes.route('/joinProject').put(async (req, res) => {
  // Logic to join an existing project
  return res.json(await associateStudent(req.body.studId, req.body.projId));

});

// Route to edit project details
projectRoutes.route('/editProject/:projectId').put(async (req, res) => {
  let id = parseInt(req.params.projectId);
  return res.json(await updateProiect(req.body, id));
});

// Route to add deliverables to a project
projectRoutes.route('/addDeliverable/:projectId').post(async (req, res) => {
  // Logic to add deliverables to a project
  let idProiect = req.params.projectId;
  return res.json(await createLivrabil(req.body, idProiect));
});

// Route to edit deliverable details
projectRoutes.route('/editDeliverable/:deliverableId').put(async (req, res) => {
  let id = parseInt(req.params.deliverableId);
  return res.json(await updateLivrabil(req.body, id));
});


//route to get reviews for deliverable
projectRoutes.route('/allReviews/:idDeliverable').get(async (req, res) => {
      let idliv = req.params.idDeliverable;
      return res.json(await getLivrabileById(idliv));
});

export default projectRoutes;