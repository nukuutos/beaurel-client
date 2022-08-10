import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import Input from '../../base/form/input';
import useOnSubmit from './use-on-submit';

const SignInForm = () => {
  const [handleSubmit, isLoading] = useOnSubmit();
  const router = useRouter();

  const goToSignUp = () => router.push('/sign-up');
  const goToForgotPassword = () => router.push('/forgot-password');

  return (
    <>
      {isLoading && <div className="spinner-with-background" />}
      <div>
        <Formik initialValues={{ identificator: '', password: '' }} onSubmit={handleSubmit}>
          <Form className="sign-in__form">
            <div className="sign-in__group mt-7">
              <label className="label" htmlFor="identificator">
                Телефон, username
              </label>
              <Input
                className="input sign-in__input"
                name="identificator"
                id="identificator"
                type="text"
              />
            </div>

            <div className="sign-in__group mt-4">
              <label className="label" htmlFor="password">
                Пароль
              </label>
              <Input
                className="input sign-in__input"
                name="password"
                id="password"
                type="password"
              />
            </div>

            <span onClick={goToForgotPassword} className="sign-in__forget-password mt-1">
              Забыли пароль?
            </span>

            <button type="submit" className="btn btn--primary sign-in__btn mt-6">
              Войти
            </button>

            <span className="sign-in__or mt-5">или</span>

            <button
              onClick={goToSignUp}
              className="btn btn--secondary sign-in__btn mt-6 mt-5"
              type="button"
            >
              Зарегестрируйся
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default SignInForm;
