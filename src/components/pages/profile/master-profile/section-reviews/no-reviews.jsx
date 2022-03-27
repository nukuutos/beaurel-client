import { useSelector } from 'react-redux';
import Stars from '../../../../base/stars/stars';

const NoReviews = () => {
  const [{ id: profileId }, { id: userId }, { isPhone }] = useSelector((state) => [
    state.profile,
    state.auth,
    state.screenSize,
  ]);

  const customerText =
    'Будь первым, кто оставит свой отзыв! Но для начала тебе нужно побывать на приёме у Мастера, удачи!';

  const ownerText = 'Здесь будут отображаться отзывы о Вас, удачи!';

  const isProfileOwner = userId === profileId;

  const starsOwnerClassName = isProfileOwner ? 'noreview__stars--owner' : '';
  const textOwnerClassName = isProfileOwner ? 'noreview__text--owner' : '';

  return (
    <div className={`profile__noreview noreview ${isPhone ? '' : 'card'}`}>
      <p className={`noreview__text ${textOwnerClassName}`}>
        {isProfileOwner ? ownerText : customerText}
      </p>
      <Stars score="5" className={`noreview__stars ${starsOwnerClassName} mt-4 mb-8`} />
    </div>
  );
};

export default NoReviews;
