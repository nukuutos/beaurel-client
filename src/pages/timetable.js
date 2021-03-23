import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import { Formik, Form } from 'formik';
import BaseSettings from '../components/timetable/base-settings';
import TimetableType from '../components/timetable/timetable-type';
import Weekends from '../components/timetable/weekends';
import WorkingDay from '../components/timetable/working-day';
import Exceptions from '../components/timetable/exceptions';
import VisualTimetableAuto from '../components/timetable/visual-timetable-auto';
import VisualTimetableManually from '../components/timetable/visual-timetable-manually';
import ManuallyAppointments from '../components/timetable/manually-appointments';
import TimetableModel from '../server/models/timetable';
import handleAuth from '../utils/handle-auth';
import { getTimetableSuccess, setTimetableUpdate } from '../redux/timetable/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import UpdatedDate from '../components/timetable/updated-date';
import VisualUpdatedTimetable from '../components/timetable/visual-updated-timetable';
import useAsyncAction from '../hooks/useAsyncAction';
import { setAlert } from '../redux/alert/actions';

const Timetable = ({}) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const [isDatePicker, setIsDatePicker] = useState(false);
  // if we've got update => disable edit every element
  // we editing something => disable other elements
  const [editState, setEditState] = useState({
    isEditing: false,
    element: { sessionTime: false, weekends: false, workingDay: false },
  });
  const [timetable, { accessToken, id: profileId, role }] = useSelector((state) => [state.timetable, state.auth]);
  const dispatch = useDispatch();

  const { manually, update, sessionTime, _id: timetableId, ...restTimetableProps } = timetable;

  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="timetable__heading heading-primary mt-8 ">Расписание</h1>
        <Formik
          initialValues={
            //   {
            //   sessionTime: 60,
            //   weekends: ['sat', 'sun'],
            //   workingDay: {
            //     startAt: 600,
            //     endAt: 1020,
            //   },
            //   type: 'auto',
            //   exceptions: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
            //   appointments: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
            //   time: 60, // value for add it to appointments
            //   date: null,
            // }
            {
              ...restTimetableProps,
              editingSessionTime: sessionTime, // purpose of this sessionTime is controll of editing sessionTime
              sessionTime, // main purpose of this session time is rendering auto timetable
              manually: { ...manually, time: timetable.sessionTime },
              date: new Date('2021-12-30T23:00:00.000Z'), // it's null
            }
          }
          // submit is calling in UpdatedDate component
          enableReinitialize
          onSubmit={async ({ editingSessionTime, manually, ...values }, { resetForm }) => {
            const update = { manually: { appointments: manually.appointments }, ...values };

            const config = {
              method: 'post',
              url: `/profile/${profileId}/timetable/${timetableId}/update`,
              data: update,
              accessToken,
              role,
            };

            const alert = await asyncAction(config);

            if (alert) {
              dispatch(setTimetableUpdate({ update }));
              resetForm();
              setIsDatePicker(false);
              dispatch(setAlert(alert));
            }
          }}>
          {({ values, dirty, initialValues, setFieldValue }) => (
            <Form className="timetable__form">
              <BaseSettings
                sessionTime={values.sessionTime}
                exceptions={values.auto.exceptions}
                startAt={values.auto.workingDay.startAt}
                editingSessionTime={values.editingSessionTime}
                initialValues={initialValues}
                setFieldValue={setFieldValue}
                update={update}
                editParentState={[editState, setEditState]}
              />
              <TimetableType type={values.type} update={update} isEditing={editState.isEditing} />

              {values.type === 'auto' ? (
                <>
                  <div className="timetable__timetable-card timetable-card mt-8 card">
                    <div className="timetable-card__heading mb-2 ">Настройки расписания</div>
                    <Weekends
                      weekends={values.auto.weekends}
                      update={update}
                      editParentState={[editState, setEditState]}
                      initialValues={initialValues}
                      setFieldValue={setFieldValue}
                    />
                    <WorkingDay
                      workingDay={values.auto.workingDay}
                      sessionTime={values.sessionTime}
                      update={update}
                      editParentState={[editState, setEditState]}
                    />
                    <Exceptions exceptions={values.auto.exceptions} />
                  </div>
                  <VisualTimetableAuto values={values} update={update} isEditing={editState.isEditing} />
                </>
              ) : (
                <>
                  <div className="timetable__timetable-card timetable-card mt-8 card">
                    <div className="timetable-card__heading mb-2 ">Настройки расписания</div>
                    <ManuallyAppointments appointments={values.manually.appointments} />
                  </div>
                  <VisualTimetableManually update={update} isEditing={editState.isEditing} values={values} />
                </>
              )}

              {!update && (
                <div
                  onClick={() => setIsDatePicker(true)}
                  className={`btn btn--primary ${dirty ? '' : 'btn--disabled'} timetable__button mt-8`}>
                  Сохранить
                </div>
              )}

              {isDatePicker && <UpdatedDate isLoading={isLoading} setIsDatePicker={setIsDatePicker} />}
            </Form>
          )}
        </Formik>

        {update && <VisualUpdatedTimetable update={update} />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const userId = await handleAuth(req, res, store);

  const timetable = await TimetableModel.findOne({ masterId: userId }, { masterId: 0 });

  store.dispatch(getTimetableSuccess({ timetable }));

  return { props: { timetable } };
});

export default Timetable;
