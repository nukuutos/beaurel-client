import React, { useEffect, useState, useRef } from 'react';

const TextMore = ({ className, maxSymbs = 30, children }) => {
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
      <p className={className}>
        {state.isTextLong && !state.isExpand ? state.shortText + ' ' : state.text + ' '}
        {state.isTextLong && (
          <span className="text-more" onClick={() => setState({ ...state, isExpand: !state.isExpand })}>
            {state.isExpand ? 'less' : 'more'}
          </span>
        )}
      </p>
    </>
  );
};

export default TextMore;
