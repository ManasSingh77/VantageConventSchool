import express from 'express';
import { login, logout,getMe } from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/login', login);
router.get("/me", protectRoute, getMe);
router.post('/logout', logout);

export default router;
