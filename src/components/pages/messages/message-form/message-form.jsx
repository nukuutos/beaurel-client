import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { useRef } from 'react';
import useKeys from '../../../../hooks/use-keys';
import Textarea from '../../../base/form/textarea';
import useOnSubmit from './use-on-submit';

const MessageForm = ({ activeDialog }) => {
  const form = useRef(null);
  const [handleSubmit] = useOnSubmit(activeDialog);

  const textAreaAdjust = (event) => {
    event.target.style.height = '1px';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <Formik innerRef={form} initialValues={{ message: '' }} onSubmit={handleSubmit}>
      {({ submitForm, isSubmitting, handleChange, dirty }) => (
        <Form className="messages__form">
          <Textarea
            onKeyDown={(event) => {
              const isLastCharacterLineBreak = !!event.target.value.slice(-2).match(/\n$/);

              if (
                event.ctrlKey &&
                event.key === 'Enter' &&
                !isLastCharacterLineBreak &&
                event.target.value.length
              ) {
                const index = event.target.selectionStart;
                const newValue = `${event.target.value.slice(0, index)}\n${event.target.value.slice(
                  index
                )}`;
                event.target.value = newValue;
                handleChange(event);
              } else if (event.key === 'Enter') {
                event.preventDefault();
                dirty && submitForm();
              }

              event.target.style.height = '1px';
              event.target.style.height = `${event.target.scrollHeight}px`;
            }}
            onKeyUp={textAreaAdjust}
            name="message"
            id="message"
            className="messages__textarea"
          />
          {isSubmitting ? (
            <div className="messages__send-spinner">
              <div className="spinner spinner--tiny" />
            </div>
          ) : (
            <FontAwesomeIcon onClick={submitForm} className="messages__send-icon" icon="envelope" />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
