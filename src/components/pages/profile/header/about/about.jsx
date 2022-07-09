import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalFallback from '../../../shared/modal-fallback';

import DisplayAboutText from './display-about-text';
import EditButton from './edit-button';

const AboutEdit = dynamic(() => import('./about-edit/about-edit'), {
  loading: () => <ModalFallback />,
});

const About = () => {
  const { aboutText } = useSelector((state) => state.profile);
  const [isEditAbout, setIsEditAbout] = useState(false);

  const openModal = () => setIsEditAbout(true);
  const closeModal = () => setIsEditAbout(false);

  return (
    <>
      {aboutText ? (
        <p className="profile__about">
          <DisplayAboutText onClick={openModal} />
        </p>
      ) : (
        <EditButton onClick={openModal} />
      )}

      {isEditAbout && <AboutEdit onClickClose={closeModal} />}
    </>
  );
};

export default About;
