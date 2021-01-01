import React, { useState } from 'react';
import MasterWorks from './master-work/master-works';
import Services from './services/services';
import Wrapper from './booking/booking';
import cardsData from './utils/cards-data';
import Card from './card';

const SectionCards = () => {
  const [state, setState] = useState({ isMasterWorks: false, isServices: false, isTimetable: false });

  const onMasterWorksClickClose = () => setState({ ...state, isMasterWorks: false });
  const onServiceClickClose = () => setState({ ...state, isServices: false });
  const onTimetableClickClose = () => setState({ ...state, isTimetable: false });

  return (
    <section className="profile__section-cards">
      <h3 className="profile__heading-tertiary mb-m">Sevices and Timetable</h3>
      <div className="profile__cards">
        {cardsData(state, setState).map((props, i) => (
          <Card {...props} key={i} />
        ))}
      </div>
      {state.isMasterWorks && <MasterWorks onClickClose={onMasterWorksClickClose} />}
      {state.isServices && <Services onClickClose={onServiceClickClose} />}
      {state.isTimetable && <Wrapper isTimetable onClickClose={onTimetableClickClose} />}
    </section>
  );
};

export default SectionCards;
