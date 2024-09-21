const mongoose = require("mongoose");
const Subject = require("../../models/subject-model");

const createTestSubjectObject = () => {
const sampleSubject = new Subject({
    subjectCode: "MATH101",
    subjectName: "Calculus I",
    description: "Introduction to differential and integral calculus, covering limits, derivatives, integrals, and applications.",
    createdBy: new mongoose.Types.ObjectId(), 
    updatedBy: new mongoose.Types.ObjectId(), 
});
return sampleSubject;
};

module.exports = createTestSubjectObject;