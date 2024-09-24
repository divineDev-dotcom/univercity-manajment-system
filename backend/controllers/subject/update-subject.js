const Subject = require('../../models/subject-model');

const updateSubject = async (req, res) => {
const { id } = req.params;
const { subjectCode, subjectName, description } = req.body;
try {
const existingSubject = await Subject.findById(id);
if (!existingSubject) {
return res.status(404).json({ error: true, msg: "Subject not found." });
}
const updatedSubject = await Subject.findByIdAndUpdate(
id,
{
subjectCode,
subjectName,
description,
updatedBy: req.user._id
},
{ new: true, runValidators: true }
);
return res.status(200).json({ error: false, message: "Subject updated successfully", data: updatedSubject });
} catch (error) {
console.error('Error updating subject:', error);
return res.status(500).json({ error: true, msg: `Error updating subject: ${error.message}` });
}
};
module.exports = updateSubject;