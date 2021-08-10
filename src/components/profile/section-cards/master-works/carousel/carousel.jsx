import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useKeys from "../../../../../hooks/use-keys";
import Sidenav from "./sidenav";
import useMediaQuery from "../../../../../hooks/use-media-query";
import PhoneSidenav from "./phone-sidenav";
import { useSwipeable } from "react-swipeable";

const prevWork = (state, works) => (state.index + works.length - 1) % works.length;
const nextWork = (state, works) => (state.index + 1) % works.length;

const Carousel = ({ state }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [{ works, masterId }, { id: userId }] = useSelector((state) => [state.work, state.auth]);
  const [{ index }, setState] = state;
  const isPhone = useMediaQuery(600);

  const handlers = useSwipeable({
    onSwipedLeft: () => setState((state) => ({ ...state, index: prevWork(state, works) })),
    onSwipedRight: () => setState((state) => ({ ...state, index: nextWork(state, works) })),
    delta: 10,
  });

  const keys = useCallback(
    () => [
      { key: "ArrowRight", fn: () => setState((state) => ({ ...state, index: nextWork(state, works) })) },
      {
        key: "ArrowLeft",
        fn: () => setState((state) => ({ ...state, index: prevWork(state, works) })),
      },
    ],
    [setState, works.length]
  );

  useKeys(keys);

  return (
    <>
      {isPhone && isDeleting && <div className="spinner-with-background" />}
      <div {...handlers} className="carousel">
        {!isPhone && isDeleting && <div className="spinner-with-background" />}

        {/* desktop chevrons */}
        {!isPhone && works.length > 1 && (
          <>
            <div
              onClick={() => setState((state) => ({ ...state, index: prevWork(state, works) }))}
              className="carousel__chevron carousel__chevron--left"
            >
              <FontAwesomeIcon icon="chevron-left" />
            </div>
            <div
              onClick={() => setState((state) => ({ ...state, index: nextWork(state, works) }))}
              className="carousel__chevron carousel__chevron--right"
            >
              <FontAwesomeIcon icon="chevron-right" />
            </div>
          </>
        )}

        <div className="carousel__main">
          {isPhone && works.length > 0 && (
            <>
              <div
                onClick={() => setState((state) => ({ ...state, index: prevWork(state, works) }))}
                className="carousel__chevron carousel__chevron--left"
              >
                <FontAwesomeIcon icon="chevron-left" />
              </div>
              <div
                onClick={() => setState((state) => ({ ...state, index: nextWork(state, works) }))}
                className="carousel__chevron carousel__chevron--right"
              >
                <FontAwesomeIcon icon="chevron-right" />
              </div>
            </>
          )}

          {userId === masterId && !isPhone && <Sidenav setIsDeleting={setIsDeleting} state={state} />}
          <img src={`http://localhost:5000/images/works/${works[index]._id}.png`} className="carousel__image" />
          {!isPhone && <figcaption className="carousel__title">{works[index].title}</figcaption>}
        </div>

        {isPhone && (
          <figcaption className="carousel__title mt-2">
            {works[index].title}
            <PhoneSidenav setIsDeleting={setIsDeleting} state={state} />
          </figcaption>
        )}
      </div>
    </>
  );
};

export default Carousel;
