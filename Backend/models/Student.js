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
    required: true
  },
  MotherName: {
    type: String,
    required: true
  },
  Class: {
    type: String,
    required: true
  },
  Section: {
    type: String,
    required: true
  },
  PENNumber: {
    type: String,
    required: true
  },
  DateOfAdmission: {
    type: Date,
    required: true
  },
  ClassOfAdmission: {
    type: String,
    required: true
  },
  DateOfBirth: {
    type: Date,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  AadharNumber: {
    type: String,
    required: true
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