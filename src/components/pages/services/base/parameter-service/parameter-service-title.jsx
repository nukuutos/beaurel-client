import CaretLeft from '../../../../base/icons/caret';
import Title from '../shared/title';

const ParameterServiceTitle = ({ shownState, title }) => {
  const [isShown] = shownState;

  const titleClassName = `service__title  ${!isShown ? 'service__title--hidden' : ''}`;

  return (
    <>
      <Title className={titleClassName}>{title}</Title>

      <div className="service__side service__side--right">
        <div
          className={`service-parameter__icon ${isShown ? 'service-parameter__icon--rotated' : ''}`}
        >
          <CaretLeft />
        </div>
      </div>
    </>
  );
};

export default ParameterServiceTitle;
