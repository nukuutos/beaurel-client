import jwt from 'jsonwebtoken';

const { JWT_ACCESS_KEY } = process.env;

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_ACCESS_KEY);
    return decoded.user;
  } catch (error) {
    return false;
  }
};

export default verifyToken;
