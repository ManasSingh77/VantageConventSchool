import express from 'express';
import { createManager, getAllManagers, deleteManager } from '../controllers/managerController.js';

const router = express.Router();
router.post('/createManager', createManager);
router.get('/getManagers', getAllManagers);
router.delete('/deleteManager/:id', deleteManager);

export default router;
