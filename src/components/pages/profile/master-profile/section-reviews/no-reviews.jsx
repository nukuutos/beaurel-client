import { useSelector } from 'react-redux';
import Stars from '../../../../base/stars/stars';

const NoReviews = () => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <div className={`profile__noreview noreview ${isPhone ? '' : 'card'}`}>
      <p className="noreview__text">
        Будь первым, кто оставит свой отзыв! Но для начала тебе нужно побывать на приёме у Мастера,
        удачи!
      </p>
      <Stars score="5" className="noreview__stars mt-4 mb-8" />
    </div>
  );
};

export default NoReviews;
