import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Avatar from "./avatar/avatar";
import ProfileRating from "./profile-rating";
import StarProfile from "./star-profile";
import Maps from "./maps";
import useMediaQuery from "../../../hooks/use-media-query";
import About from "./about/about";

const Header = () => {
  const [{ isMaps }, setState] = useState({ isMaps: false, isEditAbout: false });

  const [
    { firstName, lastName, ratingStats, specialization, placeOfwork, isPublicView, aboutText },
    { id: userId },
  ] = useSelector((state) => [state.profile, state.auth]);

  const router = useRouter();

  const isPhone = useMediaQuery(600);

  return (
    <header className={`profile__header`}>
      <div className="profile__identify">
        <Avatar className="profile__avatar" />
        <ProfileRating ratingScore={ratingStats.avgRating} />
      </div>
      <div className="profile__biography ">
        <h1 className="profile__name">{firstName + " " + lastName[0] + "."}</h1>
        <h2 className="profile__specialization">{specialization}</h2>
        <div className="profile__geoposition">
          <FontAwesomeIcon className="profile__map-marker" icon="map-marker-alt" />
          {isMaps && <Maps onClickClose={() => setState((state) => ({ ...state, isMaps: false }))} />}
          {placeOfwork}
          {!isPublicView && (
            <FontAwesomeIcon
              onClick={() => setState((state) => ({ ...state, isMaps: true }))}
              className={`profile__edit ${isPhone ? "ml-3" : "ml-4"}`}
              icon="pen"
            />
          )}
        </div>
        {!isPhone && <About />}
      </div>

      {isPhone && <About />}

      {router.asPath !== "/" + userId && <StarProfile />}
    </header>
  );
};

export default Header;
