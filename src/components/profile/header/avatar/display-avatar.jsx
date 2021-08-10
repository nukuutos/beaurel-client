import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

// images/avatars/2021-08-08T13-31-18.320Z-5eb849b81c2ccc21306ced34.png

const getAvatarPath = (avatar) => {
  const avatarPath = `http://localhost:5000/${avatar}`;
  const defaultPath = "/svg/default.svg";

  return avatar ? avatarPath : defaultPath;
};

const DisplayAvatar = ({ setIsEdit, className = "" }) => {
  const { avatar } = useSelector((state) => state.profile);

  return (
    <div onClick={() => setIsEdit(true)} className={`avatar ${className}`}>
      <img src={getAvatarPath(avatar)} alt="Profile image" className="avatar__image" />
      <div className="avatar__change-image">
        <FontAwesomeIcon className="avatar__pen-icon" icon="pen" />
      </div>
    </div>
  );
};

export default DisplayAvatar;
