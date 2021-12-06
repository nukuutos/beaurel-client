import React, { useEffect, useState } from 'react';
import { cutText } from './utils';

const TextMore = ({ textClassName, moreClassName, children }) => {
  const maxSymbs = 150;

  const [state, setState] = useState({
    text: children,
    isTextLong: children.length > maxSymbs,
    shortText: children.length > maxSymbs ? cutText(children) : null,
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
      <p
        onClick={() => setState({ ...state, isExpand: !state.isExpand })}
        className={textClassName}
      >
        {state.isTextLong && !state.isExpand ? `${state.shortText} ` : `${state.text} `}
      </p>
      {state.isTextLong && (
        <span
          className={`text-more ${moreClassName}`}
          onClick={() => setState({ ...state, isExpand: !state.isExpand })}
        >
          {state.isExpand ? 'свернуть' : 'развернуть'}
        </span>
      )}
    </>
  );
};

export default TextMore;
