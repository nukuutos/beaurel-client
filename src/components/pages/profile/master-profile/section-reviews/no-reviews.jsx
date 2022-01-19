import Stars from '../../../../base/stars/stars';

const NoReviews = () => (
  <div className="profile__noreview noreview card mt-8">
    <p className="noreview__text mt-9">
      Будь первым, кто оставит свой отзыв! Но для начала тебе нужно побывать на приёме у Мастера,
      удачи!
    </p>
    <Stars score="5" className="noreview__stars mt-4 mb-8" />
  </div>
);

export default NoReviews;
