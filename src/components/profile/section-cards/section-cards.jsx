import React, { useState } from 'react';
import MasterWorks from './master-work/master-works';
import Booking from './booking/booking';
import cardsData from './utils/cards-data';
import Card from './card';

const SectionCards = () => {
  const [state, setState] = useState({ isMasterWorks: false, isServices: false, isTimetable: false });

  const onMasterWorksClickClose = () => setState({ ...state, isMasterWorks: false });
  const onServiceClickClose = () => setState({ ...state, isServices: false });
  const onTimetableClickClose = () => setState({ ...state, isTimetable: false });

  return (
    <section className="profile__cards">
      {cardsData(state, setState).map((props, i) => (
        <Card {...props} key={i} />
      ))}
      {state.isMasterWorks && <MasterWorks onClickClose={onMasterWorksClickClose} />}
      {state.isServices && <Booking isService onClickClose={onServiceClickClose} />}
      {state.isTimetable && <Booking isTimetable onClickClose={onTimetableClickClose} />}
    </section>
  );
};

export default SectionCards;
