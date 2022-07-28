import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import Input from '../../../../../base/form/input';
import useHandleMultipleInputChange from '../../../../hooks/use-handle-multiple-input-change';
import useTimer from '../../../../hooks/use-timer/use-timer';
import ResendCode from '../../../../shared/resend-code';
import codeVerificationSchema from './schema';
import useOnSubmit from './use-on-submit';

const Verification = ({ phone }) => {
  const [timer, resendCode] = useTimer(phone, '/auth/sign-up/code');
  const [handleChange, handleKeyPress, formRef] = useHandleMultipleInputChange();
  const [handleSubmit, isLoading] = useOnSubmit(phone);

  const getDisabledClassName = (errors) => {
    const { first, seconde, third, fourth } = errors;

    if (first || seconde || third || fourth) {
      return 'btn--disabled';
    }

    return '';
  };

  useEffect(() => {
    formRef.current.validateField('first');
  }, [formRef]);

  return (
    <Formik
      innerRef={formRef}
      validationSchema={codeVerificationSchema}
      initialValues={{
        first: '',
        second: '',
        third: '',
        fourth: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <Form className="sign-up__form">
          <h2 className="sign-up__heading">Подтвердите ваш номер телефона</h2>
          <span className="sign-up__sub-heading mt-3">Введите код подтверждения</span>

          <div className="sign-up__verification">
            <Input
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className="input sign-up__input--verification mr-7"
              name="first"
              id="first"
              type="text"
              maxLength="1"
            />
            <Input
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className="input sign-up__input--verification mr-7"
              name="second"
              id="second"
              type="text"
              maxLength="1"
            />
            <Input
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className="input sign-up__input--verification mr-7"
              name="third"
              id="third"
              type="text"
              maxLength="1"
            />
            <Input
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              className="input sign-up__input--verification"
              name="fourth"
              id="fourth"
              type="text"
              maxLength="1"
            />
          </div>

          <button
            type="submit"
            className={`btn btn--primary ${getDisabledClassName(errors)} sign-up__btn`}
          >
            Подтвердить
          </button>

          <ResendCode timer={timer} resendCode={resendCode} />
        </Form>
      )}
    </Formik>
  );
};

export default Verification;
