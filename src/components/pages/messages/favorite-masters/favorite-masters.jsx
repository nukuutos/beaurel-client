import { useSelector } from 'react-redux';
import Modal from '../../../base/modal/modal';
import ModalHeading from '../../../base/modal/modal-heading';
import DisplayFavoriteMasters from './display-favorite-masters';
import NoFavoriteMasters from './no-favoirte-master';
import useGetFavoriteMasters from './use-get-favorite-masters';
import useOnScroll from './use-on-scroll';

const FavoriteMasters = ({ closeFavoriteMasters }) => {
  const favorites = useSelector((state) => state.favorites);
  const isLoading = useGetFavoriteMasters();

  const isFavorites = !!favorites.length;

  const [refToLoadData, isLoadingOnScroll] = useOnScroll();

  return (
    <Modal onClickClose={closeFavoriteMasters}>
      <div className="messages__favorite-masters">
        <ModalHeading onClickClose={closeFavoriteMasters} title="Выберете мастера" />
        {isLoading && <div className="spinner-with-background" />}
        {!isLoading && isFavorites ? (
          <DisplayFavoriteMasters
            refToLoadData={refToLoadData}
            closeFavoriteMasters={closeFavoriteMasters}
          />
        ) : (
          <NoFavoriteMasters />
        )}
      </div>
    </Modal>
  );
};

export default FavoriteMasters;
