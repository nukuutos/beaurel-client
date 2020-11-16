import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { signInStart } from '../../redux/auth/actions';

import InputCustom from './input-custom';

const SignInForm = () => {
  const dispatch = useDispatch();
  const signIn = (user) => dispatch(signInStart(user));

  return (
    <section>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(data, { setSubmitting }) => {
          // setSubmitting(true);
          signIn(data);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <h2> Welcome Back My Lord</h2>
            <div>
              <label htmlFor="email">
                {/* <FontAwesomeIcon className="admin-form__icon" icon={['fas', 'user-tie']} /> */}
              </label>
              <InputCustom
                name="email"
                id="email"
                type="text"
                placeholder="email"
                onFocus={(e) => e.target.removeAttribute('readonly')}
                readOnly
              />
            </div>

            <div className="admin-form__group">
              <label htmlFor="password">
                {/* <FontAwesomeIcon className="admin-form__icon" icon={['fas', 'lock']} /> */}
              </label>
              <InputCustom
                name="password"
                id="password"
                type="password"
                placeholder="password"
                onFocus={(e) => e.target.removeAttribute('readonly')}
                readOnly
              />
            </div>
            <button type="submit">Sign In</button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SignInForm;
