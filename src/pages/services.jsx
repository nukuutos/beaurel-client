import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import { getServicesSuccess } from '../redux/service/actions/service';
import EditServices from '../components/pages/services/edit-services/edit-services';
import DraggableServices from '../components/pages/services/draggable-services/draggable-services';
import ServiceModel from '../server/models/service';
import { getTimetableSuccess } from '../redux/timetable/actions';
import useSaveBeforeUnload from '../components/pages/services/hooks/use-save-before-unload';
import handleAuthPage from '../utils/auth/handle-auth-page/handle-auth-page';
import Switch from '../components/pages/services/switch/switch';
import ServicesUpdates from '../components/pages/services/services-updates/services-updates';

const Services = () => {
  const [{ services }, { isPhone }] = useSelector((state) => [state.services, state.screenSize]);
  const [currentTab, setCurrentTab] = useState('display'); // reorder, display

  useSaveBeforeUnload();

  const isServices = !!services.length;

  return (
    <Layout>
      <main className={`content ${isPhone ? '' : 'card card--layout'}`}>
        <h1 className="services__heading heading mt-8">Услуги</h1>

        <ServicesUpdates />

        {isServices && <Switch currentTabState={[currentTab, setCurrentTab]} />}

        {currentTab === 'reorder' ? <DraggableServices /> : <EditServices />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res }) => {
  const user = await handleAuthPage(req, res, store);

  const { services, timetable } = await ServiceModel.getServices(user.id);
  store.dispatch(getServicesSuccess({ services, masterId: user.id }));
  store.dispatch(getTimetableSuccess({ timetable }));

  return { props: { custom: 'custom' } };
});

export default Services;
