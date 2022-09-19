import React from 'react';
import Exceptions from './exceptions';
import VisualTimetableAuto from './visual-timetable-auto';
import Weekends from './weekends/weekends';
import WorkingDay from './working-day/working-day';

const TimetableAuto = ({ editState, ...props }) => (
  <>
    <div className="timetable__timetable-card timetable-card mt-6 card">
      <div className="timetable-card__heading">Настройки расписания</div>
      <Weekends editState={editState} {...props} />
      <WorkingDay editState={editState} {...props} />
      <Exceptions {...props} />
    </div>
    <VisualTimetableAuto editState={editState} {...props} />
  </>
);

export default TimetableAuto;
