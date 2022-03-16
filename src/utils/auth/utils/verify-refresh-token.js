const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const { JWT_REFRESH_KEY } = process.env;

const verifyRefreshToken = (token) => {
  const { user } = jwt.verify(token, JWT_REFRESH_KEY);
  const userId = new ObjectId(user.id);
  return userId;
};

export default verifyRefreshToken;
