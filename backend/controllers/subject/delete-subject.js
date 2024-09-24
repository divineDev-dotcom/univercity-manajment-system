const Subject = require('../../models/subject-model');

const deleteSubject = async (req, res) => {
const { id } = req.params;
try {
const subject = await Subject.findById(id);
if (!subject) {
return res.status(404).json({ error: true, msg: "Subject not found." });
}
await subject.remove();
return res.status(200).json({ error: false, msg: "Subject deleted successfully.", data: subject });
} catch (error) {
console.error('Error deleting subject:', error);
return res.status(500).json({ error: true, msg: `Error deleting subject: ${error.message}` });
}
};

module.exports = deleteSubject;
