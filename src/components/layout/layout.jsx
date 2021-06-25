import React from 'react';
import Head from 'next/head';

import Navbar from './navbar';
import Alert from '../utils/alert';

import City from './city/city';

const Layout = ({ children }) => {
  return (
    <>
      <div className="layout">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <Navbar />

        <City />

        <div className="content-wrapper">{children}</div>
      </div>
      <Alert />
    </>
  );
};

export default Layout;
