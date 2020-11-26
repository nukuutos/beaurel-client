import React, { useState } from 'react';
import ButtonMarker from '../../utils/button-marker';
import TextMore from '../../utils/text-more/text-more';
import EditAbout from './edit-about';
import { useSelector } from 'react-redux';

const SectionAbout = () => {
  const [isAboutUpdate, setIsAboutUpdate] = useState(false);

  const { aboutText, isPublicView } = useSelector((state) => state.profile);

  // About can be on the page and also not
  return (
    <>
      {aboutText && (
        <section className="profile__about">
          <h3 className="profile__heading-tertiary mb-s-4">
            About
            {!isPublicView && <ButtonMarker onClick={() => setIsAboutUpdate(true)} />}
          </h3>
          <TextMore className="profile__about-text">{aboutText}</TextMore>
        </section>
      )}

      {!aboutText && !isPublicView && (
        <section className="profile__section-about">
          <h3 className="profile__heading-tertiary mb-s-4">
            About
            <ButtonMarker onClick={() => setIsAboutUpdate(true)} />
          </h3>
          <TextMore className="profile__about-text">Add something about you...</TextMore>
        </section>
      )}

      {isAboutUpdate && <EditAbout onClickClose={() => setIsAboutUpdate(false)} aboutText={aboutText} />}
    </>
  );
};

export default SectionAbout;
