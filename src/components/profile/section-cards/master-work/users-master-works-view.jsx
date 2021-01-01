import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UsersMasterWorksView = () => {
  const [activeLink, setActiveLink] = useState(0);
  const { works, isLoading } = useSelector((state) => state.work);

  return works.length ? (
    <div className="master-works">
      <nav className="master-works__navbar">
        {works.map((work, i) => {
          const isActiveLink = i === activeLink;

          return (
            <li
              onClick={() => setActiveLink(i)}
              className={`master-works__item ${isActiveLink ? 'master-works__item--active' : ''}`}>
              {work.title}
            </li>
          );
        })}
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
    <div className="master-works"></div>
  );
};

export default UsersMasterWorksView;
