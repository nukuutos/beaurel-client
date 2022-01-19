import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useGetWorks from './use-get-works';
import MasterWork from './master-work';

const DisplayMasterWorks = ({ setParentState }) => {
  const [{ works }, { isPhone }] = useSelector((state) => [state.work, state.screenSize]);

  const isLoading = useGetWorks();

  const goToAddWork = () => setParentState((state) => ({ ...state, display: 'add' }));
  const goToCarousel = (index) => () => setParentState({ index, display: 'carousel' });

  return (
    <div
      className={`master-works ${isLoading ? 'master-works--loading' : ''} ${
        isPhone ? '' : 'card'
      }`}
    >
      {isLoading && <div className="spinner-with-background" />}

      {works.map((work, index) => (
        <MasterWork key={work.title} work={work} goToCarousel={goToCarousel(index)} />
      ))}

      <div onClick={goToAddWork} className="master-works__add-work">
        <FontAwesomeIcon icon="plus" />
      </div>
    </div>
  );
};

export default DisplayMasterWorks;
