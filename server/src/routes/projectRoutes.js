import express from "express";
import { createProiect, getProiecte, updateProiect } from "../dataAccess/ProiectDA.js";

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

// // Route to edit deliverable details
// router.put('/editDeliverable/:deliverableId', (req, res) => {
//   // Logic to edit deliverable details
// });

// // Route to add personal review
// router.post('/addOwnReview/:projectId', (req, res) => {
//   // Logic to add personal review
// });

export default projectRoutes;
