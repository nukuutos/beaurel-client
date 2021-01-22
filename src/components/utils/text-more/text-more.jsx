import React, { useEffect, useState, useRef } from 'react';

const TextMore = ({ textClassName, moreClassName, maxSymbs = 30, children }) => {
  const [state, setState] = useState({
    text: children,
    isTextLong: children.split(' ').length > maxSymbs,
    shortText: children.split(' ').length > maxSymbs ? children.split(' ').splice(0, maxSymbs).join(' ') + '...' : null, // to utils
    isExpand: false,
  });

  useEffect(() => {
    setState({
      ...state,
      text: children,
      isTextLong: children.split(' ').length > maxSymbs,
      shortText:
        children.split(' ').length > maxSymbs ? children.split(' ').splice(0, maxSymbs).join(' ') + '...' : null,
    });
  }, [children]);

  return (
    <>
      <p className={textClassName}>{state.isTextLong && !state.isExpand ? state.shortText + ' ' : state.text + ' '}</p>
      {state.isTextLong && (
        <span
          className={`text-more ${moreClassName}`}
          onClick={() => setState({ ...state, isExpand: !state.isExpand })}>
          {state.isExpand ? 'less' : 'more'}
        </span>
      )}
    </>
  );
};

export default TextMore;
