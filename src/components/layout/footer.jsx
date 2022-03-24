import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => (
  <footer className="footer card">
    <div className="footer__group">
      <span className="footer__about">О нас</span>
      <FontAwesomeIcon className="footer__instagram" icon={['fab', 'instagram']} />
    </div>
    <h1 className="logo footer__logo">Beaurel</h1>
  </footer>
);

export default Footer;
