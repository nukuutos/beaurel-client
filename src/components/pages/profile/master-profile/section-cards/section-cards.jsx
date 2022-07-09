import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import cardsData from './utils/cards-data';
import Card from './card';
// import MasterWorks from './master-works/master-works';
// import Booking from './booking/booking';

const MasterWorks = dynamic(() => import('./master-works/master-works'));
const Booking = dynamic(() => import('./booking/booking'));

const SectionCards = () => {
  const [state, setState] = useState({
    isMasterWorks: false,
    isServices: false,
    isTimetable: false,
  });

  const { isPhone } = useSelector((state) => state.screenSize);

  const onMasterWorksClickClose = () => setState({ ...state, isMasterWorks: false });
  const onServiceClickClose = () => setState({ ...state, isServices: false });
  const onTimetableClickClose = () => setState({ ...state, isTimetable: false });

  return (
    <section className="profile__cards">
      {cardsData(state, setState, isPhone).map((props) => (
        <Card {...props} key={props.fileName} />
      ))}
      {state.isMasterWorks && <MasterWorks onClickClose={onMasterWorksClickClose} />}
      {state.isServices && <Booking isService onClickClose={onServiceClickClose} />}
      {state.isTimetable && <Booking isTimetable onClickClose={onTimetableClickClose} />}
    </section>
  );
};

export default SectionCards;
