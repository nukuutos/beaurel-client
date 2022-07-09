import { useSelector } from 'react-redux';

import MasterWork from './master-work';
import Plus from '../../../../../../base/icons/plus';

const MASTER_WORKS_LIMIT = 18;

const DisplayMasterWorks = ({ setParentState, isLoading }) => {
  const [{ works }, { isPhone }] = useSelector((state) => [state.work, state.screenSize]);

  const goToAddWork = () => setParentState((state) => ({ ...state, display: 'add' }));
  const goToCarousel = (index) => () => setParentState({ index, display: 'carousel' });
  const isMasterWorksLimit = works.length >= MASTER_WORKS_LIMIT;

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

      {!isMasterWorksLimit && (
        <div onClick={goToAddWork} className="master-works__add-work">
          <Plus />
        </div>
      )}
    </div>
  );
};

export default DisplayMasterWorks;
