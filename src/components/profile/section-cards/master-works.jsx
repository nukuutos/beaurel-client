import Modal from '../../utils/modal';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FirstRender = () => (
  <div className="master-works master-works--first ">
    <main className="master-works__main master-works__main--first">
      <FontAwesomeIcon className="master-works__camera" icon="camera" />
      <p className="master-works__first-text">Here You can put your work by press on plus button at the bottom!</p>
      <li className="master-works__item master-works__item--add master-works__item--add-first">
        <FontAwesomeIcon className="master-works__plus" icon="plus" />
      </li>
    </main>
  </div>
);
const MasterWorks = ({ onClickClose }) => {
  const [activeLink, setActiveLink] = useState(0);

  const works = [
    { name: 'Beutiful nails', url: '/img/work-1.jpg' },
    { name: 'Very beutiful nails', url: '/img/work-2.jpg' },
    { name: 'Super nails', url: '/img/work-3.jpg' },
  ];

  // const works = [];

  return (
    <Modal onClickClose={onClickClose}>
      {works.length ? (
        <div className="master-works">
          <nav className="master-works__navbar">
            {works.map((work, i) => (
              <li
                onClick={() => setActiveLink(i)}
                className={`master-works__item ${i === activeLink ? 'master-works__item--active' : ''}`}
                key={i}>
                {work.name}
                <FontAwesomeIcon className="master-works__trash" icon="trash" />
              </li>
            ))}

            <li className="master-works__item master-works__item--add">
              <FontAwesomeIcon className="master-works__plus" icon="plus" />
            </li>
          </nav>
          <main className="master-works__main">
            <img className="master-works__image" src={works[activeLink].url} alt="Master's Work" />
          </main>
        </div>
      ) : (
        <FirstRender />
      )}
    </Modal>
  );
};

export default MasterWorks;
