import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/layout/layout';
// import SignInForm from '../components/pages/sign-in/sign-in-form';
import { signOut } from '../redux/auth/actions';
import getSignInServerSideProps from '../server/get-server-side-props/sign-in';

// const Layout = dynamic(() => import('../components/layout/layout'));
const SignInForm = dynamic(() => import('../components/pages/sign-in/sign-in-form'));

const SignIn = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <Layout>
      <main className="content">
        <div className="sign-in">
          <h1 className="logo">Beaurel</h1>
          <h2 className="sign-in__heading">Вход</h2>
          <SignInForm />
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = getSignInServerSideProps;

export default SignIn;
