import Modal from '../../../utils/modal';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getWorksStart, deleteWorkSuccess } from '../../../../redux/work/actions';
import asyncCall from '../../../../utils/async-call';
import { setAlert } from '../../../../redux/alert/actions';
import MasterWorks from './masters-works-view';
import EditMasterWork from './edit-master-work';
import Spinner from '../../../utils/spinner';

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
  const { works, isLoading } = useSelector((state) => state.work);
  const dispatch = useDispatch();

  useEffect(() => {
    if (works === null) dispatch(getWorksStart());
  }, []);

  return isLoading ? (
    <div className="wrapper">
      <Spinner className="spinner--gc gc-f" />
    </div>
  ) : works.length > 0 ? (
    <div className="master-works">
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
          <FontAwesomeIcon className="master-works__plus" icon="plus" />
        </li>
      </nav>
      <main className="master-works__main">
        <div className="master-works__background">
          <img
            className="master-works__image"
            src={`http://localhost:5000/images/works/${works[activeLink]._id}.png`}
            alt="Master's Work"
          />
        </div>
      </main>
    </div>
  ) : (
    <FirstRender setIsAddWork={setIsAddWork} />
  );
};

export default EditMasterWorks;
