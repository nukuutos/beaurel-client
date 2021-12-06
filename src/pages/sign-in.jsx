import React from 'react';
import Layout from '../components/layout/layout';

import SignInForm from '../components/form/sign-in-form';
import authRedirect from '../utils/auth-redirect';

authRedirect;

const SignIn = () => {
  return (
    <Layout>
      <h2>Sign In</h2>
      <SignInForm />
    </Layout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
//   await authRedirect(req, res, store);
//   store.dispatch(END);
//   await store.sagaTask.toPromise();
//   return { props: { custom: 'custom' } };
// });

export default SignIn;
