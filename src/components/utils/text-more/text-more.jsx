import React, { useEffect, useState, useRef } from 'react';

const cutText = (text) => {
  const maxSymbs = 150;

  if (text.length <= maxSymbs) return text;

  const words = text.split(' ');

  while (text.length > maxSymbs) {
    words.pop();
    text = words.join(' ');
  }

  return text + '...';
};

const TextMore = ({ textClassName, moreClassName, children }) => {
  const maxSymbs = 150;

  const [state, setState] = useState({
    text: children,
    isTextLong: children.length > maxSymbs,
    shortText: children.length > maxSymbs ? cutText(children) : null, // to utils
    isExpand: false,
  });

  useEffect(() => {
    setState({
      ...state,
      text: children,
      isTextLong: children.length > maxSymbs,
      shortText: children.length > maxSymbs ? cutText(children) : null,
    });
  }, [children]);

  return (
    <>
      <p className={textClassName}>{state.isTextLong && !state.isExpand ? state.shortText + ' ' : state.text + ' '}</p>
      {state.isTextLong && (
        <span
          className={`text-more ${moreClassName}`}
          onClick={() => setState({ ...state, isExpand: !state.isExpand })}>
          {state.isExpand ? 'свернуть' : 'развернуть'}
        </span>
      )}
    </>
  );
};

export default TextMore;
