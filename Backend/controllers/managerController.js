import Manager from '../models/Manager.js';

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



