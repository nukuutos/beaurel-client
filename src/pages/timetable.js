import React, { useState } from 'react';
import StarProfile from '../components/profile/header/star-profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileRating from '../components/profile/header/profile-rating';
import Layout from '../components/layout/layout';
import { wrapper } from '../redux/store';
import refreshToken from '../utils/refresh-token';
import { END } from 'redux-saga';
import SettingInput from '../components/settings/setting-input/setting-input';
import { Formik, Form, FieldArray } from 'formik';
import asyncCall from '../utils/async-call';
import RadioButton from '../components/form/radio-button';
import Modal from '../components/utils/modal';
import displayDuration from '../components/services/utils/display-duration';
import Select from '../components/form/select';
import renderDurationOptions from '../components/services/utils/render-duration-options';
import Input from '../components/form/input';
import generatePossibleAppointmentsTime from '../components/timetable/utils/generate-possible-appointments-time';

const translateWeekdaysFromRU = { пн: 'mon', вт: 'tue', ср: 'wen', чт: 'thu', пт: 'fri', сб: 'sat', вс: 'sun' };
const translateWeekdaysFromEN = { mon: 'пн', tue: 'вт', wen: 'ср', thu: 'чт', fri: 'пт', sat: 'сб', sun: 'вс' };

const displayExceptions = (exceptions) => {
  const output = [];

  for (const day in exceptions) {
    if (!exceptions[day].length) continue;

    const russianDayName = translateWeekdaysFromEN[day].toUpperCase();

    let text = russianDayName + ': ';

    exceptions[day].forEach((time, i) => {
      text = text + displayDuration(time);
      if (i !== exceptions[day].length - 1) text = text + ', ';
    });

    output.push(<div className="mt-1">{text}</div>);
  }

  return output;
};

const Timetable = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalWeekends, setIsModalWeekends] = useState(false);
  const [isWorkingDayEdit, setIsWorkingDayEdit] = useState(false);

  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="timetable__heading heading-primary mt-8 ">Расписание</h1>
        <Formik
          initialValues={{
            sessionTime: 60,
            weekends: ['sat', 'sun'],
            workingDay: {
              startAt: 600,
              endAt: 1020,
            },
            type: 'manually',
            exceptions: { mon: [], tue: [], wen: [], thu: [], fri: [], sat: [], sun: [] },
            date: null,
          }}
          onSubmit={async (values) => {
            const { date, oldTitle, title } = values;

            const config = {
              method: 'put',
              // url: `/profile/${profileId}/service/parameter/${oldTitle}`,
              // data: { date, service: { oldTitle, title } },
              // accessToken,
            };

            const alert = await asyncCall(dispatch, config);

            if (alert) {
              // dispatch(updateServiceParameterTitleSuccess({ updatedServiceTitles: { oldTitle, title } }));
              // dispatch(setAlert(alert));
              // setIsEdit(false);
            }
          }}>
          {({ values }) => (
            <>
              <Form className="timetable__form">
                <div className="timetable__timetable-card timetable-card timetable-card--edit mt-8 card">
                  <div className="timetable-card__heading mb-2 ">Базовые настройки</div>
                  <label className="timetable-card__label mb-1">Базовая длительность сеанса:</label>
                  {isEdit ? (
                    <>
                      <Input className="input timetable-card__input ml-1 mb-1" name="sessionTime" type="number" />
                      <span className="timetable-card__value ml-1 mb-1">мин</span>
                      <div
                        // change init v
                        onClick={() => setIsEdit(false)}
                        className="timetable-card__btn-edit--primary btn--edit btn--hover-success">
                        <FontAwesomeIcon icon="check" />
                      </div>
                      <div
                        onClick={() => setIsEdit(false)}
                        className="timetable-card__btn-edit btn--edit btn--hover-fail">
                        <FontAwesomeIcon icon="times" />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* <label className="timetable-card__label">Базовая длительность сеанса:</label> */}
                      <span className="timetable-card__value">{values.sessionTime}</span>
                      <div onClick={() => setIsEdit(true)} className="timetable-card__btn-edit btn--edit">
                        <FontAwesomeIcon icon="pen" />
                      </div>
                    </>
                  )}

                  <span className="timetable-card__tip ">
                    Возможная длительность ваших услуг:
                    {/* generate */}
                    <span className="timetable-card__tip--primary"> 1ч, 2ч, 3ч и т.д.</span>
                  </span>
                </div>

                <div className="timetable__timetable-card timetable-card mt-8 card">
                  <div className="timetable-card__heading mb-2 ">Тип расписания</div>

                  <span className="timetable-card__label mt-3">Автоматически:</span>
                  <RadioButton
                    disabled={isDisabled}
                    className={`timetable-card__value mt-3 ml-1 ${isDisabled ? 'radio-button--disabled' : ''}`}
                    name="type"
                    value="auto"
                  />

                  {isDisabled ? (
                    <div
                      onClick={() => {
                        setIsDisabled(false);
                      }}
                      className="timetable-card__btn-edit btn--edit">
                      <FontAwesomeIcon icon="pen" />
                    </div>
                  ) : (
                    <>
                      <div
                        onClick={() => setIsDisabled(true)}
                        className="timetable-card__btn-edit--primary btn--edit btn--hover-success">
                        <FontAwesomeIcon icon="check" />
                      </div>
                      <div
                        onClick={() => setIsDisabled(true)}
                        className="timetable-card__btn-edit btn--edit btn--hover-fail">
                        <FontAwesomeIcon icon="times" />
                      </div>
                    </>
                  )}

                  <span className="timetable-card__value timetable-card__label mt-2">Вручную:</span>
                  <RadioButton
                    disabled={isDisabled}
                    className={`timetable-card__value mt-2 ml-1 ${isDisabled ? 'radio-button--disabled' : ''}`}
                    name="type"
                    value="manually"
                  />
                </div>

                <div className="timetable__timetable-card timetable-card mt-8 card">
                  <div className="timetable-card__heading mb-2 ">Настройки расписания</div>
                  <label className="timetable-card__label  mt-5">Выхоные:</label>
                  {/* modal with checks, value as a array */}
                  <span className="timetable-card__value ml-1 mt-5">
                    {values.weekends.length
                      ? values.weekends
                          .map((russionWeekdayName) => translateWeekdaysFromEN[russionWeekdayName])
                          .join(' ')
                      : '-'}
                  </span>

                  {isModalWeekends && (
                    <FieldArray
                      name="weekends"
                      render={({ remove, push }) => (
                        <Modal onClickClose={() => setIsModalWeekends(false)}>
                          <div className="weekends card">
                            <h2 className="weekends__heading heading-primary">Выходные</h2>
                            <p className="weekends__text mt-6">Выбери свои выходные!</p>

                            <div className="weekends__days">
                              {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((russianWeekdayName, i) => {
                                const weekday = translateWeekdaysFromRU[russianWeekdayName];

                                const onPop = {
                                  onClick: () => remove(values.weekends.indexOf(weekday)),
                                  className: 'btn--success',
                                };
                                const onPush = { onClick: () => push(weekday), className: 'btn--secondary' };

                                const { onClick, className } = values.weekends.includes(weekday) ? onPop : onPush;

                                return (
                                  <div
                                    name={`weekends.${i}`}
                                    className={`weekends__day btn mt-6 ${className}`}
                                    onClick={onClick}
                                    key={i}>
                                    {russianWeekdayName.toUpperCase()}
                                  </div>
                                );
                              })}
                            </div>

                            <div className="weekends__button btn btn--primary mt-6">Сохранить</div>
                          </div>
                        </Modal>
                      )}
                    />
                  )}

                  <div onClick={() => setIsModalWeekends(true)} className="timetable-card__btn-edit btn--edit">
                    <FontAwesomeIcon icon="pen" />
                  </div>

                  {/* modal with time range picker */}
                  <label className="timetable-card__label  mt-5">Рабочий день:</label>
                  {isWorkingDayEdit ? (
                    <>
                      <span className="timetable-card__value ml-1 mt-5 ">
                        <Select className="timetable-card__select select mr-1" name="workingDay.startAt" as="select">
                          {renderDurationOptions(60)}
                        </Select>
                        -
                        <Select className="timetable-card__select select ml-1" name="workingDay.endAt" as="select">
                          {renderDurationOptions(60)}
                        </Select>
                      </span>
                      <div
                        onClick={() => setIsWorkingDayEdit(false)}
                        className="timetable-card__btn-edit--primary btn--edit btn--hover-success timetable-card__btn-edit--bottom">
                        <FontAwesomeIcon icon="check" />
                      </div>
                      <div
                        onClick={() => setIsWorkingDayEdit(false)}
                        className="timetable-card__btn-edit btn--edit btn--hover-fail timetable-card__btn-edit--bottom">
                        <FontAwesomeIcon icon="times" />
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="timetable-card__value ml-1 mt-5">
                        {`${displayDuration(values.workingDay.startAt)} - ${displayDuration(values.workingDay.endAt)}`}
                      </span>
                      <div
                        onClick={() => setIsWorkingDayEdit(true)}
                        className="timetable-card__btn-edit timetable-card__btn-edit--bottom btn--edit">
                        <FontAwesomeIcon icon="pen" />
                      </div>
                    </>
                  )}

                  {/* <div className="timetable-card__group mt-3"> */}
                  <label className="timetable-card__label  mt-5">Исключения:</label>
                  <span className="timetable-card__value ml-1 mt-5">{displayExceptions(values.exceptions)}</span>

                  <span className="timetable-card__tip timetable-card__tip--gray mt-1">
                    Нажмите на время в расписании, чтобы исключить его
                  </span>
                </div>

                <div className="timetable__timetable-card timetable-card mt-8 card">
                  <div className="timetable-card__heading mb-2 ">Расписание</div>
                  <div className="timetable-visual mt-4">
                    {/* this data is based of sessionTime weekends and */}
                    {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((russianWeekdayName, i) => {
                      const { weekends, workingDay, sessionTime, exceptions } = values;
                      const weekday = translateWeekdaysFromRU[russianWeekdayName];

                      const possibleAppointmentsTime = weekends.includes(weekday)
                        ? []
                        : generatePossibleAppointmentsTime(workingDay, sessionTime);

                      return (
                        <FieldArray
                          name={`exceptions[${weekday}]`}
                          render={({ remove, push }) => (
                            <div className="timetable-visual__weekday weekday" key={i}>
                              <div className="weekday__name">{russianWeekdayName}</div>
                              <div className="weekday__appointments">
                                {possibleAppointmentsTime.map(({ time, value }, i) => {
                                  const exception = {
                                    onClick: () => remove(exceptions[weekday].indexOf(value)),
                                    className: 'weekday__time--fail',
                                  };

                                  const possibleTime = {
                                    onClick: () => push(value),
                                    className: '',
                                  };

                                  const { onClick, className } = exceptions[weekday].includes(value)
                                    ? exception
                                    : possibleTime;

                                  return (
                                    <span onClick={onClick} key={i} className={`weekday__time ${className}  mt-5`}>
                                      {time}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="btn btn--primary timetable__button mt-8">Сохранить</div>
              </Form>
            </>
          )}
        </Formik>
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const { id } = query;

  await refreshToken(req, res, store); // dispatch this?
  // store.dispatch(getProfileStart({ id }));
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return { props: { custom: 'custom' } };
});

export default Timetable;
