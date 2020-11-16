import React, { useState } from 'react';
import MasterWorks from './master-works';
import Services from './service/services';
import Timetable from './timetable/timetable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cardsProps = (state, setState) => [
  { icon: ['far', 'calendar-alt'], name: 'Book a Time', onClick: () => setState({ ...state, isMasterWorks: true }) },
  { icon: 'stream', name: 'View Services', onClick: () => setState({ ...state, isServices: true }) },
  { icon: ['far', 'calendar-alt'], name: "Master's Works", onClick: () => setState({ ...state, isTimetable: true }) },
];

const Card = ({ name, icon, onClick }) => {
  return (
    <div className="profile-card" onClick={onClick ? onClick : null}>
      <FontAwesomeIcon className="profile-card__icon" icon={icon} />
      <span className="profile-card__heading">{name}</span>
    </div>
  );
};

const SectionCards = () => {
  const [state, setState] = useState({ isMasterWorks: false, isServices: false, isTimetable: false });

  const onMasterWorksClickClose = () => setState({ ...state, isMasterWorks: false });
  const onServiceClickClose = () => setState({ ...state, isServices: false });
  const onTimetableClickClose = () => setState({ ...state, isTimetable: false });

  return (
    <section className="profile__section-cards">
      <h3 className="profile__heading-tertiary mb-m">Sevices and Timetable</h3>
      <div className="profile__cards">
        {cardsProps(state, setState).map((props, i) => (
          <Card {...props} key={i} />
        ))}
      </div>

      {state.isMasterWorks && <MasterWorks onClickClose={onMasterWorksClickClose} />}
      {state.isServices && <Services onClickClose={onServiceClickClose} />}
      {state.isTimetable && <Timetable onClickClose={onTimetableClickClose} />}
    </section>
  );
};

export default SectionCards;
