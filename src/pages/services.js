import React, { useState } from "react";
import Layout from "../components/layout/layout";
import { wrapper } from "../redux/store";
import { useSelector } from "react-redux";
import { getServicesSuccess } from "../redux/service/actions/service";
import EditServices from "../components/services/edit-services/edit-services";
import DraggableServices from "../components/services/draggable-services/draggable-services";
import ServiceModel from "../server/models/service";
import { getTimetableSuccess } from "../redux/timetable/actions";
import useSaveBeforeUnload from "../components/services/hooks/use-save-before-unload";
import handleAuthPage from "../utils/auth/hande-auth-page/handle-auth-page";
import UpdateServices from "../components/services/update-services/update-services";
import ViewServices from "../components/services/view-services/view-services";
import useMediaQuery from "../hooks/use-media-query";

const Services = () => {
  const { services } = useSelector((state) => state.services);
  const [isReoder, setIsReoder] = useState(false);
  const [isUpdateServices, setIsUpdateServices] = useState({
    view: false,
    update: false,
  });

  const isPhone = useMediaQuery(600);

  useSaveBeforeUnload();

  return (
    <Layout>
      <main className={`content ${isPhone ? "" : "card card--layout"}`}>
        <h1 className="services__heading heading mt-8">Услуги</h1>

        <UpdateServices
          isUpdateServices={isUpdateServices}
          setIsUpdateServices={setIsUpdateServices}
        />
        <ViewServices
          isUpdateServices={isUpdateServices}
          setIsUpdateServices={setIsUpdateServices}
        />

        <div className="services__reoder-controller reoder-controller mt-6">
          Изменить
          <span
            onClick={() => setIsReoder(false)}
            className={`reoder-controller__item ${
              !isReoder ? "reoder-controller__item--active" : ""
            }`}
          >
            услуги
          </span>
          /
          <span
            onClick={() => setIsReoder(true)}
            className={`reoder-controller__item ${
              isReoder ? "reoder-controller__item--active" : ""
            }`}
          >
            порядок
          </span>
        </div>

        {isReoder ? (
          <DraggableServices services={services} />
        ) : (
          <EditServices services={services} />
        )}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, res, query }) => {
    const userId = await handleAuthPage(req, res, store);

    const { services, timetable } = await ServiceModel.getServices(userId);

    store.dispatch(getServicesSuccess({ services, masterId: userId }));
    store.dispatch(getTimetableSuccess({ timetable }));

    return { props: { custom: "custom" } };
  }
);

export default Services;
