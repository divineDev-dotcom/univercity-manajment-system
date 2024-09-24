const express = require("express");
const authenticateJWT = require("../middleware/jwt");
const { isAdmin } = require("../middleware/route-access-authentication");
const createSubject = require('../controllers/subject/create-subject');
const updateSubject = require('../controllers/subject/update-subject');
const deleteSubject = require('../controllers/subject/delete-subject');

const subjectRouter = express.Router();
subjectRouter.post('/add', authenticateJWT, isAdmin, createSubject);

module.exports = subjectRouter;
