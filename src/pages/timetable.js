import Layout from "../components/layout/layout";
import { wrapper } from "../redux/store";
import { Formik, Form } from "formik";
import BaseSettings from "../components/timetable/base-settings";
import TimetableType from "../components/timetable/timetable-type";
import Weekends from "../components/timetable/weekends";
import WorkingDay from "../components/timetable/working-day";
import Exceptions from "../components/timetable/exceptions";
import VisualTimetableAuto from "../components/timetable/visual-timetable-auto";
import VisualTimetableManually from "../components/timetable/visual-timetable-manually";
import ManuallyAppointments from "../components/timetable/manually-appointments";
import TimetableModel from "../server/models/timetable";
import { getTimetableSuccess, setTimetableUpdate } from "../redux/timetable/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import VisualUpdatedTimetable from "../components/timetable/visual-updated-timetable/visual-updated-timetable";
import useAsyncAction from "../hooks/use-async-action/use-async-action";
import { setAlert } from "../redux/alert/actions";
import handleAuthPage from "../utils/auth/hande-auth-page/handle-auth-page";
import UpdateTimtetable from "../components/timetable/update-timtetable";
import { servicesToUnsuitable } from "../redux/service/actions/service";
import useMediaQuery from "../hooks/use-media-query";

const Timetable = () => {
  const [asyncAction, isLoading] = useAsyncAction();
  const isPhone = useMediaQuery(600);
  const [updateTimetable, setUpdateTimetable] = useState({
    isVisible: false,
    servicesCountToUpdate: null,
    step: 0,
  });
  // if we've got update => disable edit every element
  // we editing something => disable other elements
  const [editState, setEditState] = useState({
    isEditing: false,
    element: { sessionTime: false, weekends: false, workingDay: false },
  });
  const [timetable, servicesState, { accessToken, id: profileId }] = useSelector((state) => [
    state.timetable,
    state.services,
    state.auth,
  ]);
  const dispatch = useDispatch();

  const { manually, update, sessionTime, _id: timetableId, ...restTimetableProps } = timetable;

  const formRef = useRef({});

  const { setFieldValue, submitForm } = formRef.current;

  return (
    <Layout>
      <main className={`content ${isPhone ? "" : "card card--layout"}`}>
        <h1 className="timetable__heading heading mt-8 ">Расписание</h1>
        <Formik
          innerRef={formRef}
          initialValues={{
            ...restTimetableProps,
            editingSessionTime: sessionTime, // purpose of this sessionTime is controll of editing sessionTime
            sessionTime, // main purpose of this session time is rendering auto timetable
            manually: { ...manually, hours: 540, mins: 0 },
            date: null, // it's null
          }}
          enableReinitialize
          // submit is calling in UpdatedDate component
          onSubmit={async ({ editingSessionTime, manually, ...values }, { resetForm }) => {
            const update = {
              manually: { appointments: manually.appointments },
              ...values,
            };

            const config = {
              method: "post",
              url: `/master/${profileId}/timetable/${timetableId}/update`,
              data: update,
              accessToken,
            };

            const data = await asyncAction(config);

            if (data) {
              const { unsuitableServicesCount, ...alert } = data;

              // services to unsuitable
              if (servicesState.services.length && servicesState.masterId === profileId && unsuitableServicesCount) {
                const { date, sessionTime } = values;
                dispatch(servicesToUnsuitable({ date, sessionTime }));
              }

              dispatch(setTimetableUpdate({ update }));

              resetForm();
              setUpdateTimetable((state) => {
                if (!unsuitableServicesCount) return { ...state, isVisible: false };
                return {
                  ...state,
                  step: 1,
                  servicesCountToUpdate: unsuitableServicesCount,
                };
              });
              dispatch(setAlert(alert));
            }
          }}
        >
          {({ values, dirty, initialValues, setFieldValue, submitForm, resetForm }) => (
            <Form className="timetable__form">
              <BaseSettings
                values={values}
                initialValues={initialValues}
                setFieldValue={setFieldValue}
                update={update.date}
                editParentState={[editState, setEditState]}
              />
              <TimetableType
                resetForm={resetForm}
                initialValues={initialValues}
                type={values.type}
                update={update.date}
                isEditing={editState.isEditing}
              />

              {values.type === "auto" ? (
                <>
                  <div className="timetable__timetable-card timetable-card mt-8 card">
                    <div className="timetable-card__heading ">Настройки расписания</div>
                    <Weekends
                      weekends={values.auto.weekends}
                      update={update.date}
                      editParentState={[editState, setEditState]}
                      initialValues={initialValues}
                      setFieldValue={setFieldValue}
                    />
                    <WorkingDay
                      workingDay={values.auto.workingDay}
                      sessionTime={values.sessionTime}
                      update={update.date}
                      editParentState={[editState, setEditState]}
                    />
                    <Exceptions exceptions={values.auto.exceptions} />
                  </div>
                  <VisualTimetableAuto values={values} update={update.date} isEditing={editState.isEditing} />
                </>
              ) : (
                <>
                  <div className="timetable__timetable-card timetable-card mt-8 card">
                    <div className="timetable-card__heading mb-2 ">Настройки расписания</div>
                    <ManuallyAppointments appointments={values.manually.appointments} />
                  </div>
                  <VisualTimetableManually update={update.date} isEditing={editState.isEditing} values={values} />
                </>
              )}

              {!update.date && (
                <div
                  onClick={() =>
                    setUpdateTimetable((state) => ({
                      ...state,
                      isVisible: true,
                    }))
                  }
                  className={`btn btn--primary ${dirty ? "" : "btn--disabled"} timetable__button mt-8`}
                >
                  Сохранить
                </div>
              )}
            </Form>
          )}
        </Formik>

        {updateTimetable.isVisible && (
          <UpdateTimtetable
            submitFunctions={{ setFieldValue, submitForm }}
            isLoading={isLoading}
            updateTimetableState={[updateTimetable, setUpdateTimetable]}
          />
        )}

        {update.date && <VisualUpdatedTimetable />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const userId = await handleAuthPage(req, res, store);

  const timetable = await TimetableModel.findOne({ masterId: userId });

  store.dispatch(getTimetableSuccess({ timetable }));

  return { props: {} };
});

export default Timetable;
