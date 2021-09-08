import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useKeys from "../../../../../hooks/use-keys";
import Sidenav from "./sidenav";
import useMediaQuery from "../../../../../hooks/use-media-query";
import PhoneSidenav from "./phone-sidenav";
import { useSwipeable } from "react-swipeable";

const getPrevWork = (state, works) => (state.index + works.length - 1) % works.length;
const getNextWork = (state, works) => (state.index + 1) % works.length;

const Chevrons = ({ toNextWork, toPrevWork }) => {
  return (
    <>
      <div onClick={toPrevWork} className="carousel__chevron carousel__chevron--left">
        <FontAwesomeIcon icon="chevron-left" />
      </div>
      <div onClick={toNextWork} className="carousel__chevron carousel__chevron--right">
        <FontAwesomeIcon icon="chevron-right" />
      </div>
    </>
  );
};

const Carousel = ({ state }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [{ works, masterId }, { id: userId }] = useSelector((state) => [state.work, state.auth]);
  const [{ index }, setState] = state;
  const isPhone = useMediaQuery(600);

  const toPrevWork = () => setState((state) => ({ ...state, index: getPrevWork(state, works) }));
  const toNextWork = () => setState((state) => ({ ...state, index: getNextWork(state, works) }));

  const handlers = useSwipeable({
    onSwipedLeft: toPrevWork,
    onSwipedRight: toNextWork,
    delta: 10,
  });

  const keys = useCallback(
    () => [
      { key: "ArrowRight", fn: toNextWork },
      {
        key: "ArrowLeft",
        fn: toPrevWork,
      },
    ],
    [setState, works.length]
  );

  useKeys(keys);

  const isDesktopChevrons = !isPhone && works.length > 1;
  const isPhoneChevrons = isPhone && works.length > 1;
  const isOwner = userId === masterId;

  return (
    <>
      {isPhone && isDeleting && <div className="spinner-with-background" />}
      <div {...handlers} className="carousel">
        {!isPhone && isDeleting && <div className="spinner-with-background" />}

        {isDesktopChevrons && <Chevrons toNextWork={toNextWork} toPrevWork={toPrevWork} />}

        <div className="carousel__main">
          {isPhoneChevrons && <Chevrons toNextWork={toNextWork} toPrevWork={toPrevWork} />}
          {isOwner && !isPhone && <Sidenav setIsDeleting={setIsDeleting} state={state} />}
          <img src={`http://localhost:5000/images/works/${works[index]._id}.png`} className="carousel__image" />
          {!isPhone && <figcaption className="carousel__title">{works[index].title}</figcaption>}
        </div>

        {isPhone && (
          <figcaption className="carousel__title mt-2">
            {works[index].title}
            {isOwner && <PhoneSidenav setIsDeleting={setIsDeleting} state={state} />}
          </figcaption>
        )}
      </div>
    </>
  );
};

export default Carousel;
