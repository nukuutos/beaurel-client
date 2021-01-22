import React from 'react';
import Head from 'next/head';

import Navbar from './navbar';
import Alert from '../utils/alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

        <div className="city-geoposition mt-6 card">
          <FontAwesomeIcon className="city-geoposition__icon mr-5" icon="crosshairs" /> Хабаровск
        </div>

        <div className="content-wrapper">{children}</div>
      </div>
      <Alert />
    </>
  );
};

export default Layout;
