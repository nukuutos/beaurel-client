import React from 'react';
import { useSelector } from 'react-redux';
import VisualUpdatedTimetableAuto from '../visual-updated-timetable-auto';
import VisualUpdatedTimetableManually from '../visual-updated-timetable-manually';

const UpdatedTimetable = () => {
  const { update } = useSelector((state) => state.timetable);

  return (
    <div className="timetable-visual mt-4">
      {update.type === 'auto' ? <VisualUpdatedTimetableAuto /> : <VisualUpdatedTimetableManually />}
    </div>
  );
};

export default UpdatedTimetable;
