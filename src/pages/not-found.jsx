import React from 'react';
import Layout from '../components/layout/layout';

const NotFound = () => (
  <Layout>
    <main className="content not-found">
      {/* <div className="no-master-tools"> */}
      <img className="not-found__svg" alt="No master works" src="/svg/404.svg" />

      <p className="not-found__text">Такой страницы не существует</p>

      <div className="not-found__sad-smile">:(</div>
      {/* </div> */}
    </main>
  </Layout>
);

export default NotFound;
