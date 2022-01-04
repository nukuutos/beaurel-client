import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import Input from '../../../../base/form/input';
import displayDuration from './display-duration';
import codeVerificationSchema from './schema';
import useHandleChange from './use-handle-change';
import useOnSubmit from './use-on-submit';
import useTimer from './use-timer';

const Verification = ({ phone }) => {
  const [timer, resendCode] = useTimer(phone);
  const [handleChange, formRef] = useHandleChange();
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
              className="input sign-up__input--verification mr-7"
              name="first"
              id="first"
              type="text"
              maxLength="1"
            />
            <Input
              onChange={handleChange}
              className="input sign-up__input--verification mr-7"
              name="second"
              id="second"
              type="text"
              maxLength="1"
            />
            <Input
              onChange={handleChange}
              className="input sign-up__input--verification mr-7"
              name="third"
              id="third"
              type="text"
              maxLength="1"
            />
            <Input
              onChange={handleChange}
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

          {timer ? (
            <span className="sign-up__repeat mt-3">
              Повторно получить код можно через
              <span className="sign-up__time"> {displayDuration(timer)}</span>
            </span>
          ) : (
            <span className="sign-up__repeat mt-3">
              Не получили код?{' '}
              <span onClick={resendCode} className="btn-text">
                отправить повторно
              </span>
            </span>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Verification;
