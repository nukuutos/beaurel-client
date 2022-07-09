const getMessageTime = (createdAt) => {
  const [hour, minute] = [createdAt.hour(), createdAt.minute()];

  const stringMinutes = minute < 10 ? `0${minute}` : minute;
  const stringHours = hour < 10 ? `0${hour}` : hour;
  const displayTime = `${stringHours}:${stringMinutes}`;

  return displayTime;
};

export default getMessageTime;
