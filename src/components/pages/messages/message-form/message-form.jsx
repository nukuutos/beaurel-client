import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { useRef } from 'react';
import Textarea from '../../../base/form/textarea';
import getHandleKeyPresses from './get-handle-key-presses';
import schema from './schema';
import useOnSubmit from './use-on-submit';

const MessageForm = () => {
  const form = useRef(null);
  const [handleSubmit] = useOnSubmit();

  return (
    <Formik
      validationSchema={schema}
      innerRef={form}
      initialValues={{ message: '' }}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const { submitForm, isSubmitting } = props;
        const { handleKeyDown, handleKeyUp } = getHandleKeyPresses(props);

        return (
          <Form className="messages__form">
            <Textarea
              isErrorClassName={false}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              name="message"
              id="message"
              className="messages__textarea"
            />

            {isSubmitting ? (
              <div className="messages__send-icon messages__send-spinner">
                <div className="spinner spinner--tiny" />
              </div>
            ) : (
              <FontAwesomeIcon
                onClick={submitForm}
                className="messages__send-icon"
                icon="envelope"
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default MessageForm;
