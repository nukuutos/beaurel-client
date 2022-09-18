import { useSelector } from 'react-redux';

import MasterWork from './master-work';
import Plus from '../../../../../../base/icons/plus';

const MASTER_WORKS_LIMIT = 18;

const DisplayMasterWorks = ({ goToAddWork, getClickOnWork, isLoading }) => {
  const [{ works }, { isPhone }] = useSelector((state) => [state.work, state.screenSize]);

  const isMasterWorksLimit = works.length >= MASTER_WORKS_LIMIT;

  return (
    <div
      className={`master-works ${isLoading ? 'master-works--loading' : ''} ${
        isPhone ? '' : 'card'
      }`}
    >
      {isLoading && <div className="spinner-with-background" />}

      {works.map((work, index) => {
        const clickOnWork = getClickOnWork(index);
        return <MasterWork key={work.title} work={work} goToCarousel={clickOnWork} />;
      })}

      {!isMasterWorksLimit && (
        <div onClick={goToAddWork} className="master-works__add-work">
          <Plus />
        </div>
      )}
    </div>
  );
};

export default DisplayMasterWorks;
