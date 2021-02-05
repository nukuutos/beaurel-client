import React, { useState, useEffect } from 'react';
import StarProfile from '../components/profile/header/star-profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileRating from '../components/profile/header/profile-rating';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import refreshToken from '../utils/refresh-token';
import { END } from 'redux-saga';
import Modal from '../components/utils/modal';
import AddService from '../components/profile/section-cards/services/master-services/add-service/add-service';
import DragAndEditServices from '../components/services/drag-and-edit-services';
import { useSelector, useDispatch } from 'react-redux';
import useSaveBeforeUnload from '../components/profile/section-cards/services/master-services/hooks/use-save-before-unload';
import { getServicesStart } from '../redux/service/actions/service';
import EditServices from '../components/services/edit-services/edit-services';
import DraggableServices from '../components/services/draggable-services/draggable-services';

const Services = () => {
  const [isAddService, setIsAddService] = useState(false);
  const [{ services, initialOrder, isLoading }, { accessToken }, { id: profileId }] = useSelector((state) => [
    state.services,
    state.auth,
    state.profile,
  ]); // add public view
  const dispatch = useDispatch();

  const [isReoder, setIsReoder] = useState(false);

  useSaveBeforeUnload();

  // change this
  // const handleOnClick = () => {
  //   const newOrder = getIdsAndOrders(services);

  //   if (!areOrdersEqual(initialOrder, newOrder)) {
  //     // spec
  //     dispatch(setInitialOrder(newOrder));
  //     const config = {
  //       method: 'patch',
  //       url: `/profile/${profileId}/service/order`,
  //       data: { newOrder },
  //       accessToken,
  //     };

  //     asyncCall(dispatch, config);
  //   }

  //   onClickClose();
  // };

  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="services__heading heading-primary mt-8">Услуги</h1>
        {isLoading ? (
          <Spinner className="spinner--gc gc-f" />
        ) : (
          <>
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

            {/* <EditServices services={services} setIsAddService={setIsAddService} /> */}

            {isReoder ? <DraggableServices services={services} /> : <EditServices services={services} />}
          </>
        )}

        {/* // ) : ( */}
        {/* <DragAndEditServices setIsAddService={setIsAddService} /> */}
        {/* // )}/ */}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const { id } = query;

  await refreshToken(req, res, store); // dispatch this?
  store.dispatch(getServicesStart());

  // store.dispatch(getProfileStart({ id }));
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return { props: { custom: 'custom' } };
});

export default Services;
