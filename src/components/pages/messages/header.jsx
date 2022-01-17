import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ showFavoriteMasters, backToDialogs }) => (
  <>
    <div className="messages__header">
      <h1 className="messages__heading">Сообщения</h1>
      <FontAwesomeIcon
        onClick={showFavoriteMasters}
        className="messages__new-dialog-icon"
        icon="plus"
      />
    </div>

    <FontAwesomeIcon onClick={backToDialogs} icon="arrow-left" className="messages__arrow-back" />
  </>
);

export default Header;
