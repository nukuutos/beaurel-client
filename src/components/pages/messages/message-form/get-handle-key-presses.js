const handleLineBreak = (event, handleChange) => {
  const { value, selectionStart } = event.target;
  const index = selectionStart;
  const beforeLineBreak = value.slice(0, index);
  const afterLineBreak = value.slice(0, index);
  const newValue = `${beforeLineBreak}\n${afterLineBreak}`;
  event.target.value = newValue;
  handleChange(event);
};

const handleEnter = ({ event, dirty, submitForm }) => {
  event.preventDefault();
  if (dirty) submitForm();
};

const adjustTextarea = (event) => {
  event.target.style.height = '1px';
  event.target.style.height = `${event.target.scrollHeight}px`;
};

const getHandleKeyDown =
  ({ dirty, submitForm, handleChange }) =>
  (event) => {
    const { target, key, ctrlKey } = event;
    const { value } = target;
    const isEnter = key === 'Enter';

    const isLastCharacterLineBreak = !!value.slice(-2).match(/\n$/);
    const isLineBreakCharacter = ctrlKey && isEnter && !isLastCharacterLineBreak && value.length;

    if (isLineBreakCharacter) handleLineBreak(event, handleChange);
    else if (isEnter) handleEnter({ event, dirty, submitForm });

    adjustTextarea(event);
  };

const getHandleKeyPresses = (props) => {
  const handleKeyDown = getHandleKeyDown(props);
  const handleKeyUp = adjustTextarea;
  return { handleKeyDown, handleKeyUp };
};

export default getHandleKeyPresses;
