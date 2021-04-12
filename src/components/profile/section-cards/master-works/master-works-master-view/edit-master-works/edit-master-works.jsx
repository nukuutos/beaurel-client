import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import EditMasterWork from './edit-master-work/edit-master-work';

const FirstRender = ({ setIsAddWork }) => (
  <div className="master-works master-works--first ">
    <main className="master-works__main master-works__main--first">
      <FontAwesomeIcon className="master-works__camera" icon="camera" />
      <p className="master-works__first-text">Here You can put your work by press on plus button at the bottom!</p>
      <li
        onClick={() => setIsAddWork(true)}
        className="master-works__item master-works__item--add master-works__item--add-first">
        <FontAwesomeIcon className="master-works__plus" icon="plus" />
      </li>
    </main>
  </div>
);
const EditMasterWorks = ({ setIsAddWork }) => {
  const [activeLink, setActiveLink] = useState(0);
  const { works } = useSelector((state) => state.work);

  return works.length > 0 ? (
    <div className="master-works">
      <main className="master-works__main">
        <div className="master-works__background">
          <img
            className="master-works__image"
            src={`http://localhost:5000/images/works/${works[activeLink]._id}.png`}
            alt="Master's Work"
          />
        </div>
      </main>
      <nav className="master-works__navbar">
        {works.map((work, i) => (
          <EditMasterWork
            work={work}
            isLastLink={i + 1 === works.length}
            isActiveLink={i === activeLink}
            setActiveLink={setActiveLink}
            i={i}
            key={i}
          />
        ))}

        <li onClick={() => setIsAddWork(true)} className="master-works__item master-works__item--add">
          <FontAwesomeIcon icon="plus" />
        </li>
      </nav>
    </div>
  ) : (
    <FirstRender setIsAddWork={setIsAddWork} />
  );
};

export default EditMasterWorks;
