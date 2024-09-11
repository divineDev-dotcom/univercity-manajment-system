const Faculty = require("../models/faculty-model");

/*
This controller handles CRUD operations for the Faculty model.
It allows creating a new faculty, retrieving all or specific faculties by ID, 
updating faculty information, and deleting faculty records. 
The controller also tracks the user who creates or updates the faculty by setting 
'createdBy' and 'updatedBy' fields to the current authenticated user.
*/

const createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty({
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id
    });
    await faculty.save();
    res.status(201).json(faculty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllFaculty = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user._id
      },
      { new: true }
    );
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    res.status(200).json(faculty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
