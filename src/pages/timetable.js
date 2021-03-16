import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import { Formik, Form } from 'formik';
import BaseSettings from '../components/timetable/base-settings';
import TimetableType from '../components/timetable/timetable-type';
import Weekends from '../components/timetable/weekends';
import WorkingDay from '../components/timetable/working-day';
import Exceptions from '../components/timetable/exceptions';
import VisualTimetableAuto from '../components/timetable/visual-timetable-auto';
import VisualUpdatedTimetableAuto from '../components/timetable/visual-updated-timetable-auto';
import VisualTimetableManually from '../components/timetable/visual-timetable-manually';
import ManuallyAppointments from '../components/timetable/manually-appointments';
import VisualUpdatedTimetableManually from '../components/timetable/visual-updated-timetable-manually';
import TimetableModel from '../server/models/timetable';
import handleAuth from '../utils/handle-auth';
import { getTimetableSuccess, setTimetableUpdate } from '../redux/timetable/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import UpdatedDate from '../components/timetable/updated-date';

const Timetable = () => {
  // const timetable = {
  //   sessionTime: 60,
  //   type: 'auto',
  //   auto: {
  //     weekends: ['sat', 'sun'],
  //     workingDay: {
  //       startAt: 600,
  //       endAt: 1020,
  //     },
  //     exceptions: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
  //   },
  //   manually: {
  //     appointments: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
  //     // time: 60, // input for add appointment manually (add it on the client for timetable structure)
  //   },
  //   update: {
  //     date: null,
  //     sessionTime: 60,
  //     type: 'auto',
  //     auto: {
  //       weekends: ['sat', 'sun'],
  //       workingDay: {
  //         startAt: 600,
  //         endAt: 1020,
  //       },
  //       exceptions: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
  //       //possibleAppointmetnsTimes ?
  //     },
  //     manually: {
  //       appointments: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
  //       // time: 60, // input for add appointment manually (add it on the client for timetable structure)
  //     },
  //   },
  // };
  const [isDatePicker, setIsDatePicker] = useState(false);
  const timetable = useSelector((state) => state.timetable);
  const { manually, update, ...restTimetableProps } = timetable;
  const dispatch = useDispatch();
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
              manually: { ...manually, time: timetable.sessionTime },
              date: new Date('2020-12-30T23:00:00.000Z'), // it's null
            }
          }
          onSubmit={async (values) => {
            const update = { ...values };

            const config = {
              method: 'put',
              // url: `/profile/${profileId}/service/parameter/${oldTitle}`,
              // data: { date, service: { oldTitle, title } },
              // accessToken,
            };

            // const alert = await asyncCall(dispatch, config);
            dispatch(setTimetableUpdate({ update }));
            // if (alert) {
            //   dispatch(updateServiceParameterTitleSuccess({ updatedServiceTitles: { oldTitle, title } }));
            //   dispatch(setAlert(alert));
            //   setIsEdit(false);
            // }
          }}>
          {({ values }) => (
            <Form className="timetable__form">
              <BaseSettings sessionTime={values.sessionTime} update={update} />
              <TimetableType type={values.type} isDisabled={update} />

              {values.type === 'auto' ? (
                <>
                  <div className="timetable__timetable-card timetable-card mt-8 card">
                    <div className="timetable-card__heading mb-2 ">Настройки расписания</div>
                    <Weekends weekends={values.auto.weekends} update={update} />
                    <WorkingDay workingDay={values.auto.workingDay} sessionTime={values.sessionTime} update={update} />
                    <Exceptions exceptions={values.auto.exceptions} update={update} />
                  </div>
                  <VisualTimetableAuto values={values} />
                </>
              ) : (
                <>
                  <div className="timetable__timetable-card timetable-card mt-8 card">
                    <div className="timetable-card__heading mb-2 ">Настройки расписания</div>
                    <ManuallyAppointments appointments={values.manually.appointments} />
                  </div>
                  <VisualTimetableManually values={values} />
                </>
              )}

              {!update && (
                <div onClick={() => setIsDatePicker(true)} className="btn btn--primary timetable__button mt-8">
                  Сохранить
                </div>
              )}

              {isDatePicker && <UpdatedDate setIsDatePicker={setIsDatePicker} />}

              {/* add to update property updated timetable(or can i omit it?)*/}
              {/* after success save on server:  */}
              {/* reset form to initial values(excepting update)  */}
              {/* change redux store */}
            </Form>
          )}
        </Formik>

        {update && update.type === 'auto' && <VisualUpdatedTimetableAuto update={update} />}
        {update && update.type === 'manually' && <VisualUpdatedTimetableManually update={update} />}
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const userId = await handleAuth(req, res, store);

  const timetable = await TimetableModel.findOne({ masterId: userId }, { masterId: 0, _id: 0 });

  store.dispatch(getTimetableSuccess({ timetable }));

  return { props: { custom: 'custom' } };
});

export default Timetable;
