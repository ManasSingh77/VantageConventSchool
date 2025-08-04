import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema({
  SrNo: {
    type: Number,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  FatherName: {
    type: String,
  },
  MotherName: {
    type: String,
  },
  Class: {
    type: String,
  },
  Section: {
    type: String,
  },
  PENNumber: {
    type: String,
  },
  DateOfAdmission: {
    type: Date,
  },
  ClassOfAdmission: {
    type: String,
  },
  DateOfBirth: {
    type: Date,
  },
  Address: {
    type: String,
  },
  AadharNumber: {
    type: String,
  },
  RelatedDocuments: {
    type: String
  },
  MobileNumber1: {
    type: String,
  },
  MobileNumber2: {
    type: String
  },
  DateOfRemoval: {
    type: Date
  }
});
const Student = mongoose.model("Student", StudentSchema);
export default Student;