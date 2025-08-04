import Manager from '../models/Manager.js';
import {generateTokenAndSetCookie} from '../utils/generateToken.js';
export const login = async (req, res) => {
  const { type, username, password } = req.body;
  try {
    const manager = await Manager.findOne({ type, username, password });
    if(!manager){
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    generateTokenAndSetCookie(manager._id, res);
    if (manager) {
      res.status(201).json({_id: manager._id,});
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const getMe = async (req, res) => {
	try {
		const user = await Manager.findById(req.user._id);
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
  // Basic logout controller
  try {
		res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: 'Logout successful' });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
