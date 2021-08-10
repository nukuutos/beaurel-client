import React, { useState } from "react";
import AboutEdit from "./about-edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import useMediaQuery from "../../../../hooks/use-media-query";

const AboutText = ({ onClick }) => {
  const { isPublicView, aboutText } = useSelector((state) => state.profile);

  return (
    <>
      {aboutText}
      {!isPublicView && <FontAwesomeIcon onClick={onClick} className="profile__edit ml-4" icon="pen" />}
    </>
  );
};

const EditButton = ({ onClick }) => {
  const { isPublicView } = useSelector((state) => state.profile);
  const isPhone = useMediaQuery(600);

  const className = "btn btn--secondary profile__about-btn";
  const mobileClassName = "btn btn--secondary btn--flat mt-2";

  return (
    !isPublicView && (
      <div onClick={onClick} className={isPhone ? mobileClassName : className}>
        О себе...
      </div>
    )
  );
};

const About = () => {
  const { aboutText } = useSelector((state) => state.profile);
  const [isEditAbout, setIsEditAbout] = useState(false);

  const onClick = () => setIsEditAbout(true);

  return (
    <>
      <p className="profile__about">{aboutText ? <AboutText onClick={onClick} /> : <EditButton onClick={onClick} />}</p>
      {isEditAbout && <AboutEdit onClickClose={() => setIsEditAbout(false)} />}
    </>
  );
};

export default About;
