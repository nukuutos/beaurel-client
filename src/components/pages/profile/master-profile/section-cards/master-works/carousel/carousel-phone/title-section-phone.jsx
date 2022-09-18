import React from 'react';
import { useSelector } from 'react-redux';
import Sidenav from '../sidenav';

const TitleSectionPhone = ({ state, deleteWork, goToEditWork }) => {
  const [{ works, masterId }, { id: userId }] = useSelector((state) => [state.work, state.auth]);

  const { index } = state;

  const isOwner = userId === masterId;

  return (
    <figcaption className="carousel__title mt-2">
      {works[index].title}
      {isOwner && (
        <Sidenav
          className="carousel__mobile-buttons"
          deleteWork={deleteWork}
          goToEditWork={goToEditWork}
        />
      )}
    </figcaption>
  );
};

export default TitleSectionPhone;
