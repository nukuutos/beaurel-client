import React from 'react';
import { useSelector } from 'react-redux';
import SidenavPhone from './sidenav-phone';

const TitleSectionPhone = ({ setIsDeleting, state }) => {
  const [{ works, masterId }, { id: userId }] = useSelector((state) => [state.work, state.auth]);

  const [{ index }] = state;

  const isOwner = userId === masterId;

  return (
    <figcaption className="carousel__title mt-2">
      {works[index].title}
      {isOwner && <SidenavPhone setIsDeleting={setIsDeleting} state={state} />}
    </figcaption>
  );
};

export default TitleSectionPhone;
