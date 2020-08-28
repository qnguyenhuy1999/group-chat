const status = require('http-status');

const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const email = authHeader && authHeader.split(' ')[1];

  if (!email) {
    return res.status(status.FORBIDDEN).json({
      message: 'No token provided',
    });
  }

  req.user = await User.findOne({ email });
  next();
};
