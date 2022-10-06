import React from 'react';

import { useDispatch } from 'react-redux';
import { setActiveInterlocutor } from '../../../redux/slices/messages';
import Plus from '../../base/icons/plus';
import ArrowLeft from '../../base/icons/arrow-left';

const Header = ({ showFavoriteMasters }) => {
  const dispatch = useDispatch();

  const backToDialogs = () => dispatch(setActiveInterlocutor({}));

  return (
    <>
      <div className="messages__header">
        <h1 className="messages__heading">Сообщения</h1>
        <Plus onClick={showFavoriteMasters} className="messages__new-dialog-icon" />
      </div>

      <ArrowLeft onClick={backToDialogs} className="messages__arrow-back" />
    </>
  );
};

export default Header;
