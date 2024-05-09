const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Get the token from cookies or headers
  const token = req.cookies.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWTSecret);
    req.user = decoded; // Add the decoded user information to the request object
    next(); // Call the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateUser;