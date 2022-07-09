import { Form, Formik } from 'formik';
import React from 'react';
import Passwords from '../passwords';
import Phone from '../phone';
import Progress from '../progress/progress';
import schema from '../schema';
import VerificationCode from '../verification-code';

const ForgotPasswordForm = ({ goToNextStep, state, setState, handleSubmit }) => (
  <>
    <Progress count={3} state={[state, setState]} />
    <Formik
      validationSchema={schema}
      initialValues={{
        newPassword: '',
        newConfirmedPassword: '',
        phone: '',
        code: {
          first: '',
          second: '',
          third: '',
          fourth: '',
        },
      }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className="sign-up__form">
          {state.current === 1 && <Phone goNext={goToNextStep} {...props} />}
          {state.current === 2 && <VerificationCode goNext={goToNextStep} {...props} />}
          {state.current === 3 && <Passwords goNext={goToNextStep} {...props} />}
        </Form>
      )}
    </Formik>
  </>
);

export default ForgotPasswordForm;
