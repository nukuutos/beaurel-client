import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveInterlocutor } from '../../../redux/messages/actions';
import getAvatarPath from '../../pages/utils/get-avatar-path';
import MapMarker from '../icons/map-marker';
import Modal from '../modal/modal';
import ModalHeading from '../modal/modal-heading';
import useCustomerCard from './use-customer-card';

const CustomerCard = ({ user, onClickClose }) => {
  const [{ role }, { isPhone }] = useSelector((state) => [state.auth, state.screenSize]);
  const dispatch = useDispatch();
  const { firstName, lastName, isAvatar, _id } = user;
  const avatarUrl = getAvatarPath(_id, isAvatar);
  const name = `${firstName} ${lastName[0]}.`;
  const router = useRouter();

  const [{ aboutText, city, appointmentsCount, reviewsCount }, isLoading] = useCustomerCard(_id);

  const isMessages = router.pathname === '/messages';
  const isMaster = role === 'master';

  const goToMessages = () => {
    dispatch(setActiveInterlocutor({ ...user }));
    router.push('/messages');
  };

  const className = aboutText ? 'customer-card--with-about-text' : '';

  return (
    <Modal onClickClose={onClickClose}>
      <div className={`customer-card ${className}`}>
        {isLoading && <div className="spinner-with-background" />}
        {isPhone && <ModalHeading title="Информация о клиенте" onClickClose={onClickClose} />}

        <div className="customer-card__left">
          <img src={avatarUrl} alt="Customer" className="customer-card__avatar" />
          <h2 className="customer-card__name">{name}</h2>
          <span className="customer-card__city">
            <MapMarker /> {city}
          </span>
        </div>
        <div className="customer-card__right">
          <div className="customer-card__statistic">
            <span className="customer-card__indicator">
              Количество записей: {appointmentsCount || 0}
            </span>
            <span className="customer-card__indicator">
              Количество отзывов: {reviewsCount || 0}
            </span>
          </div>
          {isMaster && !isMessages && (
            <button
              onClick={goToMessages}
              type="button"
              className="customer-card__button btn btn--secondary"
            >
              Написать
            </button>
          )}
        </div>
        {aboutText && <p className="customer-card__about">{aboutText}</p>}
      </div>
    </Modal>
  );
};

export default CustomerCard;
