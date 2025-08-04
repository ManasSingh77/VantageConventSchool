import express from 'express';
import { createManager, getAllManagers, deleteManager, getAllStudents, createStudent, getStudentById, updateStudent } from '../controllers/managerController.js';

const router = express.Router();
router.post('/createManager', createManager);
router.get('/getManagers', getAllManagers);
router.delete('/deleteManager/:id', deleteManager);
router.get('/getStudents', getAllStudents);
router.post('/createStudent', createStudent);
router.get('/getStudent/:id', getStudentById);
router.put('/updateStudent/:id', updateStudent);

export default router;
