import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveInterlocutor } from '../../../../redux/slices/messages';
import Modal from '../../../base/modal/modal';
import Unauthorized from '../master-profile/section-cards/booking/shared/unauthorized';

const MessageButton = () => {
  const [isUnauthorizedModal, setIsUnauthorizedModal] = useState(false);

  const [{ avatar, firstName, lastName, id: _id }, { accessToken }] = useSelector((state) => [
    state.profile,
    state.auth,
  ]);
  const dispatch = useDispatch();
  const router = useRouter();

  const openUnauthorizedModal = () => setIsUnauthorizedModal(true);
  const closeUnauthorizedModal = () => setIsUnauthorizedModal(false);

  const goToMessages = () => {
    dispatch(setActiveInterlocutor({ firstName, lastName, _id, avatar }));
    router.push('/messages');
  };

  const handleClick = accessToken ? goToMessages : openUnauthorizedModal;

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="profile__about-btn btn btn--secondary "
      >
        Написать
      </button>

      {isUnauthorizedModal && (
        <Modal onClickClose={closeUnauthorizedModal}>
          <Unauthorized onClickClose={closeUnauthorizedModal} title="Написать сообщение">
            Необходимо зарегистрироваться, чтобы Вы смогли написать сообщение мастеру!
          </Unauthorized>
        </Modal>
      )}
    </>
  );
};

export default MessageButton;
