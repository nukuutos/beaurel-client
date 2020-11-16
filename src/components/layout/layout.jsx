import React from 'react';
import Head from 'next/head';

import Navbar from './navbar';
import Alert from '../utils/alert';

const Layout = ({ children }) => {
  return (
    <>
      <div className="container">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
        </Head>
        <Navbar />
        {children}
      </div>
      <Alert />
    </>
  );
};

export default Layout;
