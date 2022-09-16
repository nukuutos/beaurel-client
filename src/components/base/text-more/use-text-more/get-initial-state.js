const MAX_SYMBOLS = 150;

const cutText = (text) => {
  if (text.length <= MAX_SYMBOLS) return text;

  const words = text.split(' ');

  while (text.length > MAX_SYMBOLS) {
    words.pop();
    text = words.join(' ');
  }

  return `${text}...`;
};

const getInitialState = (text) => {
  const isTextLong = text.length > MAX_SYMBOLS;
  const shortText = text.length > MAX_SYMBOLS ? cutText(text) : null;

  return {
    isTextLong,
    shortText,
    isExpand: false,
  };
};

export default getInitialState;
