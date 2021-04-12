import React, { useState } from 'react';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import { useSelector } from 'react-redux';
import { getServicesSuccess } from '../redux/service/actions/service';
import EditServices from '../components/services/edit-services/edit-services';
import DraggableServices from '../components/services/draggable-services/draggable-services';
import ServiceModel from '../server/models/service';
import handleAuth from '../utils/handle-auth';
import { getTimetableSuccess } from '../redux/timetable/actions';
import useSaveBeforeUnload from '../components/services/hooks/use-save-before-unload';

const Services = () => {
  const { services } = useSelector((state) => state.services);
  const [isReoder, setIsReoder] = useState(false);

  useSaveBeforeUnload();

  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="services__heading heading-primary mt-8">Услуги</h1>

        <div className="services__reoder-controller reoder-controller mt-6">
          Изменить
          <span
            onClick={() => setIsReoder(false)}
            className={`reoder-controller__item ${!isReoder ? 'reoder-controller__item--active' : ''}`}>
            услуги
          </span>
          /
          <span
            onClick={() => setIsReoder(true)}
            className={`reoder-controller__item ${isReoder ? 'reoder-controller__item--active' : ''}`}>
            порядок
          </span>
        </div>

        {isReoder ? <DraggableServices services={services} /> : <EditServices services={services} />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const userId = await handleAuth(req, res, store);

  const { services, timetable } = await ServiceModel.getServices(userId);

  store.dispatch(getServicesSuccess({ services }));
  store.dispatch(getTimetableSuccess({ timetable }));

  return { props: { custom: 'custom' } };
});

export default Services;
