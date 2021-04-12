export const cutText = (text) => {
  const maxSymbs = 150;

  if (text.length <= maxSymbs) return text;

  const words = text.split(' ');

  while (text.length > maxSymbs) {
    words.pop();
    text = words.join(' ');
  }

  return text + '...';
};
