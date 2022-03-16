import { sign } from 'jsonwebtoken';

const { JWT_ACCESS_KEY, JWT_ACCESS_KEY_TIME, JWT_REFRESH_KEY, JWT_REFRESH_KEY_TIME } = process.env;

export const createAccessToken = (user) => {
  const { _id, username, role } = user;

  const payload = {
    user: {
      id: _id,
      role,
      username,
    },
  };

  return sign(payload, JWT_ACCESS_KEY, { expiresIn: JWT_ACCESS_KEY_TIME });
};

export const createRefreshToken = (user) => {
  const { _id } = user;

  const payload = {
    user: {
      id: _id,
    },
  };

  return sign(payload, JWT_REFRESH_KEY, {
    expiresIn: JWT_REFRESH_KEY_TIME,
  });
};
