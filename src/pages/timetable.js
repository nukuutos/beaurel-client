import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import refreshToken from '../utils/refresh-token-auth';
import { Formik, Form } from 'formik';
import asyncCall from '../utils/async-call';
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

const Timetable = () => {
  const timetable = {
    sessionTime: 60,
    type: 'auto',
    auto: {
      weekends: ['sat', 'sun'],
      workingDay: {
        startAt: 600,
        endAt: 1020,
      },
      exceptions: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
    },
    manually: {
      appointments: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
      // time: 60, // input for add appointment manually (add it on the client for timetable structure)
    },
    update: {
      date: null,
      sessionTime: 60,
      type: 'auto',
      auto: {
        weekends: ['sat', 'sun'],
        workingDay: {
          startAt: 600,
          endAt: 1020,
        },
        exceptions: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
      },
      manually: {
        appointments: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
        // time: 60, // input for add appointment manually (add it on the client for timetable structure)
      },
    },
  };

  const { manually, update, ...restTimetableProps } = timetable;

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
            { ...restTimetableProps, manually: { ...manually, time: timetable.sessionTime } }
          }
          onSubmit={async (values) => {
            const { date, oldTitle, title } = values;

            const config = {
              method: 'put',
              // url: `/profile/${profileId}/service/parameter/${oldTitle}`,
              // data: { date, service: { oldTitle, title } },
              // accessToken,
            };

            // const alert = await asyncCall(dispatch, config);
            console.log(values);
            // if (alert) {
            // dispatch(updateServiceParameterTitleSuccess({ updatedServiceTitles: { oldTitle, title } }));
            // dispatch(setAlert(alert));
            // setIsEdit(false);
            // }
          }}>
          {({ values }) => (
            <Form className="timetable__form">
              <BaseSettings sessionTime={values.sessionTime} />
              <TimetableType type={values.type} />

              {values.type === 'auto' ? (
                <>
                  <div className="timetable__timetable-card timetable-card mt-8 card">
                    <div className="timetable-card__heading mb-2 ">Настройки расписания</div>
                    <Weekends weekends={values.auto.weekends} />
                    <WorkingDay workingDay={values.auto.workingDay} sessionTime={values.sessionTime} />
                    <Exceptions exceptions={values.auto.exceptions} />
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

              {!update && <button className="btn btn--primary timetable__button mt-8">Сохранить</button>}
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
  const { id } = query;

  await refreshToken(req, res, store); // dispatch this?

  return { props: { custom: 'custom' } };
});

export default Timetable;
