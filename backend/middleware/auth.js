const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token tidak diberikan' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // simpan data admin ke request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
}

module.exports = auth;
