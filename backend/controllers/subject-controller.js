// Subject controller

const Subject = require('../moduls/subject-modul');

const createSubject = async(req, res) => {
const { subjectCode, subjectName, description } = req.body;
try {
const existingSubject = await Subject.findOne({ subjectCode });
if (existingSubject) {
return res.status(400).json({ error: true, msg: "Subject with this code already exists." });
}
const newSubject = new Subject({
subjectCode,
subjectName,
description,
createdBy: req.user._id,
updatedBy: req.user._id
});
await newSubject.save();
return res.status(201).json({ error: false, message: "Subject created successfully", subject: newSubject });
} catch (error) {
console.error('Error creating subject:', error);
return res.status(500).json({ error: true, msg: `Error creating subject: ${error.message}` });
}
};

const updateSubject = async (req, res) => {
const { id } = req.params;
const { subjectCode, subjectName, description } = req.body;
try {
const subject = await Subject.findById(id);
if (!subject) {
return res.status(404).json({ error: true, msg: "Subject not found." });
}
subject.subjectCode = subjectCode || subject.subjectCode;
subject.subjectName = subjectName || subject.subjectName;
subject.description = description || subject.description;
subject.updatedBy = req.user._id;
await subject.save();
return res.status(200).json({ error: false, message: "Subject updated successfully", subject });
} catch (error) {
console.error('Error updating subject:', error);
return res.status(500).json({ error: true, msg: `Error updating subject: ${error.message}` });
}
};

const deleteSubject = async (req, res) => {
const { id } = req.params;
try {
const subject = await Subject.findById(id);
if (!subject) {
return res.status(404).json({ error: true, msg: "Subject not found." });
}
await subject.remove();
return res.status(200).json({ error: false, msg: "Subject deleted successfully." });
} catch (error) {
console.error('Error deleting subject:', error);
return res.status(500).json({ error: true, msg: `Error deleting subject: ${error.message}` });
}
};

const getAllSubjects = async (req, res) => {
try {
const subjects = await Subject.find();
return res.status(200).json({ error: false, subjects });
} catch (error) {
console.error('Error fetching subjects:', error);
return res.status(500).json({ error: true, msg: `Error fetching subjects: ${error.message}` });
}
};

const getSubjectById = async (req, res) => {
const { id } = req.params;
try {
const subject = await Subject.findById(id);
if (!subject) {
return res.status(404).json({ error: true, msg: "Subject not found." });
}
return res.status(200).json({ error: false, subject });
} catch (error) {
console.error('Error fetching subject:', error);
return res.status(500).json({ error: true, msg: `Error fetching subject: ${error.message}` });
}
};

module.exports = {
createSubject,
updateSubject,
deleteSubject,
getAllSubjects,
getSubjectById
};
