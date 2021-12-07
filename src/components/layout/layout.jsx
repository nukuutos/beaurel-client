import React from 'react';
import Head from 'next/head';

import Navigation from './navigation';
import Alert from '../base/alert';

import City from './city/city';

const Layout = ({ children }) => (
  <>
    <div className="layout">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navigation />
      <City />

      {children}
    </div>
    <Alert />
  </>
);

export default Layout;
