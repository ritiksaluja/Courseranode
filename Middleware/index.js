import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, 'asdfg123'); 

    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    console.log(token)
    res.status(403).json({ error: 'Access denied. Invalid token.' });
  }
};