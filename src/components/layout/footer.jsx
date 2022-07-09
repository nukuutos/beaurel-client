import React from 'react';
import Instagram from '../base/icons/instagram';

const Footer = () => (
  <footer className="footer card">
    <div className="footer__group">
      <span className="footer__about">О нас</span>
      <Instagram className="footer__instagram" />
    </div>
    <h1 className="logo footer__logo">Beaurel</h1>
  </footer>
);

export default Footer;
