const getAvatarPath = (userId, isAvatar, editCounter = null) => {
  let avatarPath = `https://storage.yandexcloud.net/${process.env.NEXT_PUBLIC_S3_BUCKET}/${userId}/avatar.webp`;

  if (editCounter) avatarPath += `?${editCounter}`;

  const defaultPath = '/svg/default.svg';

  return isAvatar ? avatarPath : defaultPath;
};

export default getAvatarPath;
