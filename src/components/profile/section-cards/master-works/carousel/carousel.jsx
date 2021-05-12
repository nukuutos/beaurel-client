import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useKeys from '../../../../../hooks/use-keys';
import Sidenav from './sidenav';

const Carousel = ({ state }) => {
  const [{ works, masterId }, { id: userId }] = useSelector((state) => [state.work, state.auth]);
  const [{ index }, setState] = state;

  const keys = useCallback(
    () => [
      { key: 'ArrowRight', fn: () => setState((state) => ({ ...state, index: (state.index + 1) % works.length })) },
      {
        key: 'ArrowLeft',
        fn: () => setState((state) => ({ ...state, index: (state.index + works.length - 1) % works.length })),
      },
    ],
    [setState, works.length]
  );

  useKeys(keys);

  return (
    <>
      <figure className="carousel">
        <div
          onClick={() => setState((state) => ({ ...state, index: (state.index - 1) % works.length }))}
          className="carousel__chevron carousel__chevron--left">
          <FontAwesomeIcon icon="chevron-left" />
        </div>

        <div className="carousel__main">
          {userId === masterId && <Sidenav state={state} />}
          <img src={`http://localhost:5000/images/works/${works[index]._id}.png`} className="carousel__image" />
          <figcaption className="carousel__title">{works[index].title}</figcaption>
        </div>

        <div
          onClick={() => setState((state) => ({ ...state, index: (state.index + 1) % works.length }))}
          className="carousel__chevron carousel__chevron--right">
          <FontAwesomeIcon icon="chevron-right" />
        </div>
      </figure>
    </>
  );
};

export default Carousel;
