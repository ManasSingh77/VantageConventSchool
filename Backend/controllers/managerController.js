import Manager from '../models/Manager.js';
import Student from '../models/Student.js';

export const createManager = async (req, res) => {
  const { type, username, password } = req.body;
  try {
    const manager = new Manager({ type, username, password });
    await manager.save();
    res.status(201).json({ message: 'Manager created', manager });
  } catch (error) {
    res.status(500).json({ message: 'Error creating manager', error });
  }
};

export const getAllManagers = async (req, res) => {
  try {
    const managers = await Manager.find({ type: { $ne: 'manager' } });
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching managers', error });
  }
};

export const deleteManager = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedManager = await Manager.findByIdAndDelete(id);
    if (!deletedManager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    res.status(200).json({ message: 'Manager deleted', deletedManager });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting manager', error });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body); // Accept any fields present in req.body
    await student.save();
    res.status(201).json({ message: 'Student created', student });
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated', student });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};



