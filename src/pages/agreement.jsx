import React from 'react';
import Layout from '../components/layout/layout';
import getAgreementServerSideProps from '../server/get-server-side-props/agreement';

const NotFound = () => (
  <Layout>
    <main className="content not-found">something</main>
  </Layout>
);

export const getServerSideProps = getAgreementServerSideProps;

export default NotFound;
