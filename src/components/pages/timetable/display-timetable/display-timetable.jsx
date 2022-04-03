import React from 'react';
import { useSelector } from 'react-redux';
import TimetableForm from '../timetable-form/timetable-form';
import VisualUpdatedTimetable from '../visual-updated-timetable/visual-updated-timetable';

const DisplayTimetable = () => {
  const { update } = useSelector((state) => state.timetable);
  const isUpdate = update?.date;

  return (
    <>
      <h1 className="timetable__heading heading mt-8">Расписание</h1>
      <TimetableForm />
      {isUpdate && <VisualUpdatedTimetable />}
    </>
  );
};

export default DisplayTimetable;
