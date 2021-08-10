import React, { useState } from 'react';
import MasterWorks from './master-works/master-works';
import Booking from './booking/booking';
import cardsData from './utils/cards-data';
import Card from './card';
import useMediaQuery from '../../../hooks/use-media-query';

const SectionCards = () => {
  const [state, setState] = useState({ isMasterWorks: false, isServices: false, isTimetable: false });
  const isMobile = useMediaQuery(600)

  const onMasterWorksClickClose = () => setState({ ...state, isMasterWorks: false });
  const onServiceClickClose = () => setState({ ...state, isServices: false });
  const onTimetableClickClose = () => setState({ ...state, isTimetable: false });

  return (
    <section className="profile__cards">
      {cardsData(state, setState, isMobile).map((props, i) => (
        <Card {...props} key={i} />
      ))}
      {state.isMasterWorks && <MasterWorks onClickClose={onMasterWorksClickClose} />}
      {state.isServices && <Booking isService onClickClose={onServiceClickClose} />}
      {state.isTimetable && <Booking isTimetable onClickClose={onTimetableClickClose} />}
    </section>
  );
};

export default SectionCards;
