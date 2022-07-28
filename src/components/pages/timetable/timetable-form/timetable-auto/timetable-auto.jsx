import React from 'react';
import Exceptions from './exceptions';
import VisualTimetableAuto from './visual-timetable-auto';
import Weekends from './weekends/weekends';
import WorkingDay from './working-day/working-day';

const TimetableAuto = ({ editState, ...formikProps }) => (
  <>
    <div className="timetable__timetable-card timetable-card mt-6 card">
      <div className="timetable-card__heading">Настройки расписания</div>
      <Weekends {...formikProps} editState={editState} />
      <WorkingDay {...formikProps} editState={editState} />
      <Exceptions {...formikProps} />
    </div>
    <VisualTimetableAuto {...formikProps} editState={editState} />
  </>
);

export default TimetableAuto;
