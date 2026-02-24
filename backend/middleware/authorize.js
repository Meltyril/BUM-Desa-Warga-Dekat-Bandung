// backend/middleware/authorize.js
// Middleware untuk cek role - pastikan user memiliki role yang tepat
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ message: 'Token tidak diberikan' });
    }

    if (!allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({ 
        message: 'Anda tidak memiliki akses ke fitur ini',
        userRole: req.admin.role,
        requiredRoles: allowedRoles
      });
    }

    next();
  };
}

module.exports = authorize;
