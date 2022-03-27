import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveInterlocutor } from '../../../../redux/messages/actions';

const MessageButton = () => {
  const { avatar, firstName, lastName, id: _id } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const router = useRouter();

  const goToMessages = () => {
    dispatch(setActiveInterlocutor({ firstName, lastName, _id, avatar }));
    router.push('/messages');
  };

  return (
    <button onClick={goToMessages} type="button" className="profile__about-btn btn btn--secondary ">
      Написать
    </button>
  );
};

export default MessageButton;
