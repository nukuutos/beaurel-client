import jwt from 'jsonwebtoken';

const { JWT_KEY_ACCESS } = process.env;

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY_ACCESS);
    return decoded.user.id;
  } catch (error) {
    return false;
  }
};

export default verifyToken;
