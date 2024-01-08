const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
const authRoutes = require('./src/routes/authRoutes.js');
const studentRoutes = require('./src/routes/studentRoutes.js');
const juryMemberRoutes = require('./src/routes/juryMemberRoutes.js');
const professorRoutes = require('./src/routes/professorRoutes.js');

// Use the route files
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/jury', juryMemberRoutes);
app.use('/professors', professorRoutes);

const PORT = process.env.PORT || 5000; // port

app.listen(PORT, () => {
  console.log(`Serverul functioneaza pe port-ul ${PORT}.`);
});
