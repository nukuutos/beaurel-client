import useTextMore from './use-text-more/use-text-more';

const TextMore = ({ textClassName, moreClassName, children: text }) => {
  const [{ isExpand, isTextLong, shortText }, toggle] = useTextMore(text);

  const toggleButtonText = isExpand ? 'свернуть' : 'развернуть';
  const textToDisplay = isTextLong && !isExpand ? `${shortText} ` : `${text} `;

  return (
    <>
      <p onClick={toggle} className={textClassName}>
        {textToDisplay}
      </p>
      {isTextLong && (
        <span className={`text-more ${moreClassName}`} onClick={toggle}>
          {toggleButtonText}
        </span>
      )}
    </>
  );
};

export default TextMore;
