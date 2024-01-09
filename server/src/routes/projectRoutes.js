import express from "express";
import { createProiect, getProiecte, updateProiect } from "../dataAccess/ProiectDA.js";
import { updateLivrabil } from "../dataAccess/LivrabilDa.js";

const projectRoutes = express.Router();

// Route to create a new project
projectRoutes.route('/createProject').post(async (req, res) => {
    return res.json(await createProiect(req.body));
});

projectRoutes.route('/allProjects').get(async (req, res) => {
    return res.json(await getProiecte());
})

// // Route to join an existing project
projectRoutes.post('/joinProject', (req, res) => {
  // Logic to join an existing project
  //primesc in body idstud si idproj

});

// Route to edit project details
projectRoutes.route('/editProject/:projectId').put(async (req, res) => {
  let id = parseInt(req.params.projectId);
  return res.json(await updateProiect(req.body, id));
});

// Route to add deliverables to a project
projectRoutes.post('/addDeliverable/:projectId', (req, res) => {
  // Logic to add deliverables to a project
});

// Route to edit deliverable details
projectRoutes.route('/editDeliverable/:deliverableId').put(async (req, res) => {
  let id = parseInt(req.params.deliverableId);
  return res.json(await updateLivrabil(req.body, id));
});

// // Route to add personal review
// router.post('/addOwnReview/:projectId', (req, res) => {
//   // Logic to add personal review
      //
// });

export default projectRoutes;