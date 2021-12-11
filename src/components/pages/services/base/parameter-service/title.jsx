import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Title = ({ shownState, title }) => {
  const [isShown] = shownState;

  const titleClassName = `service__title  ${!isShown ? 'service__title--hidden' : ''}`;

  return (
    <>
      <div className="service__side service__side--left">
        <span className="label">Название</span>
        <span className={titleClassName}>{title}</span>
      </div>

      <div className="service__side service__side--right">
        <div
          className={`service-parameter__icon ${isShown ? 'service-parameter__icon--rotated' : ''}`}
        >
          <FontAwesomeIcon icon="caret-left" />
        </div>
      </div>
    </>
  );
};

export default Title;
