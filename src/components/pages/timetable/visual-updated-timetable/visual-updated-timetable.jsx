import React, { useState } from 'react';
import ConfirmationModal from './confirmation-modal';
import Header from './header';
import UpdatedTimetable from './updated-timetable/updated-timetable';

const VisualUpdatedTimetable = () => {
  const [isConfirmation, setIsConfirmation] = useState(false);

  const openModal = () => setIsConfirmation(true);
  const closeModal = () => setIsConfirmation(false);

  return (
    <div className="timetable__timetable-card timetable-card timetable-card--timetable mt-8 card">
      <Header openModal={openModal} />

      <UpdatedTimetable />

      {isConfirmation && <ConfirmationModal closeModal={closeModal} />}
    </div>
  );
};

export default VisualUpdatedTimetable;
