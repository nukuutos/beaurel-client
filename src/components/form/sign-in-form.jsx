import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';

import { signInSuccess } from '../../redux/auth/actions';

import InputCustom from './input-custom';
import useAsyncAction from '../../hooks/use-async-action/use-async-action';

const SignInForm = () => {
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();
  const router = useRouter();

  return (
    <section>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (data, { setSubmitting }) => {
          const config = {
            method: 'post',
            url: `/auth/sign-in`,
            data,
            accessToken: null,
          };

          const { id, accessToken, role } = await asyncAction(config);

          if (id) {
            dispatch(signInSuccess({ id, accessToken, role })); // add work success
            router.push(`/${id}`);
          }
          // setSubmitting(true);
          // signIn(data);
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
