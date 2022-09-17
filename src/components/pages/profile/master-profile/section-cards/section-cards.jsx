import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Card from './card';
import useCardsState from './hooks/use-cards-state';
import getCardsData from './utils/get-cards-data';

const MasterWorks = dynamic(() => import('./master-works/master-works'));
const Booking = dynamic(() => import('./booking/booking'));

const SectionCards = () => {
  const [state, { closeActions, openActions }] = useCardsState();
  const { isPhone } = useSelector((state) => state.screenSize);

  const { isMasterWorks, isServices, isTimetable } = state;
  const { closeMasterWorks, closeServices, closeTimetable } = closeActions;

  const cardsData = getCardsData(openActions, isPhone);

  return (
    <section className="profile__cards">
      {cardsData.map((props) => (
        <Card {...props} key={props.fileName} />
      ))}
      {isMasterWorks && <MasterWorks onClickClose={closeMasterWorks} />}
      {isServices && <Booking isService onClickClose={closeServices} />}
      {isTimetable && <Booking isTimetable onClickClose={closeTimetable} />}
    </section>
  );
};

export default SectionCards;
