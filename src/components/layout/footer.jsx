import React from 'react';
import Vk from '../base/icons/vk';

const Footer = () => (
  <footer className="footer card">
    <div className="footer__content">
      <div className="footer__group">
        <h2 className="logo footer__logo">Beaurel</h2>
        <a target="_blank" href="https://vk.com/beaurel" rel="noreferrer">
          <Vk className="footer__vk" />
        </a>
      </div>
      <span className="footer__rights">All rights reserved © 2022</span>
    </div>
  </footer>
);

export default Footer;
