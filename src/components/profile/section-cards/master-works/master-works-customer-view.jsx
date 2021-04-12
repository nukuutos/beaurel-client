import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MasterWorksCustomerView = () => {
  const [activeLink, setActiveLink] = useState(0);
  const { works } = useSelector((state) => state.work);

  return works.length ? (
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
    </div>
  ) : (
    <div className="master-works"></div>
  );
};

export default MasterWorksCustomerView;
