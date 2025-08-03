export const login = (req, res) => {
  // Basic login controller
  res.status(200).json({ message: 'Login successful' });
};

export const logout = (req, res) => {
  // Basic logout controller
  res.status(200).json({ message: 'Logout successful' });
};
