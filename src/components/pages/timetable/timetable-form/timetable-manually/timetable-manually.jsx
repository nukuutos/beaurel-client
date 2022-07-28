import React from 'react';
import ManuallyAppointments from './manually-appointments';
import VisualTimetableManually from './visual-timetable-manually/visual-timetable-manually';

const TimetableManually = ({ editState, ...formikProps }) => (
  <>
    <div className="timetable__timetable-card timetable-card mt-6 card">
      <div className="timetable-card__heading mb-2 ">Настройки расписания</div>
      <ManuallyAppointments {...formikProps} />
    </div>
    <VisualTimetableManually editState={editState} {...formikProps} />
  </>
);

export default TimetableManually;
