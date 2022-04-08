import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { setActiveInterlocutor } from '../../../redux/messages/actions';

const Header = ({ showFavoriteMasters }) => {
  const dispatch = useDispatch();

  const backToDialogs = () => dispatch(setActiveInterlocutor({}));

  return (
    <>
      <div className="messages__header">
        <h1 className="messages__heading">Сообщения</h1>
        {/* <div className="btn-icon"> */}
        <FontAwesomeIcon
          onClick={showFavoriteMasters}
          className="messages__new-dialog-icon"
          icon="plus"
        />
        {/* </div> */}
      </div>

      <FontAwesomeIcon onClick={backToDialogs} icon="arrow-left" className="messages__arrow-back" />
    </>
  );
};

export default Header;
