const getAvatarPath = (avatar) => {
  const avatarPath = `http://localhost:5000/${avatar}`;
  const defaultPath = '/svg/default.svg';

  return avatar ? avatarPath : defaultPath;
};

export default getAvatarPath;
