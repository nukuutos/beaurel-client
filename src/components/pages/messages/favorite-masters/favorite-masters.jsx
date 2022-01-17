import { useSelector } from 'react-redux';
import Modal from '../../../base/modal';
import ModalHeading from '../../../base/modal/modal-heading';
import FavoriteMaster from './favorite-master';
import NoFavoriteMasters from './no-favoirte-master';
import useGetFavoriteMasters from './use-get-favorite-masters';

const FavoriteMasters = ({ closeFavoriteMasters, setActiveDialog }) => {
  const favorites = useSelector((state) => state.favorites);
  const isLoading = useGetFavoriteMasters();

  const isFavorites = !!favorites.length;

  return (
    <Modal isMobileBackground onClickClose={closeFavoriteMasters}>
      <div className="messages__favorite-masters">
        <ModalHeading onClickClose={closeFavoriteMasters} title="Выберете мастера" />
        {isLoading && <div className="spinner-with-background" />}
        {!isLoading && isFavorites ? (
          favorites.map((favorite) => (
            <FavoriteMaster
              onClickClose={closeFavoriteMasters}
              setActiveDialog={setActiveDialog}
              master={favorite}
            />
          ))
        ) : (
          <NoFavoriteMasters />
        )}
      </div>
    </Modal>
  );
};

export default FavoriteMasters;
