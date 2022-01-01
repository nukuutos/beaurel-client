import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';

import SignInForm from '../components/pages/sign-in/sign-in-form';

const SignIn = () => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <Layout>
      <main className={`content ${isPhone ? '' : 'card card--layout'}`}>
        <div className="sign-in">
          <h1 className="logo">Beautify</h1>
          <h2 className="sign-in__heading">Вход</h2>
          <SignInForm />
        </div>
      </main>
    </Layout>
  );
};

// if token => push to profile

// export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
//   await authRedirect(req, res, store);
//   store.dispatch(END);
//   await store.sagaTask.toPromise();
//   return { props: { custom: 'custom' } };
// });

export default SignIn;
