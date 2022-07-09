import Image from 'next/image';
import React from 'react';
import Layout from '../components/layout/layout';
import getNotFoundServerSideProps from '../server/get-server-side-props/not-found';

const NotFound = () => (
  <Layout>
    <main className="content not-found">
      <div className="not-found__image">
        <Image layout="fill" alt="No master works" src="/svg/404.svg" />
      </div>

      <p className="not-found__text">Такой страницы не существует</p>

      <div className="not-found__sad-smile">:(</div>
    </main>
  </Layout>
);

export const getServerSideProps = getNotFoundServerSideProps;

export default NotFound;
