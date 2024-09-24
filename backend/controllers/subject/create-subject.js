const Subject = require('../../models/subject-model');

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
return res.status(201).json({ error: false, message: "Subject created successfully", data: newSubject });
} catch (error) {
console.error('Error creating subject:', error);
return res.status(500).json({ error: true, msg: `Error creating subject: ${error.message}` });
}
};
module.exports = createSubject;
