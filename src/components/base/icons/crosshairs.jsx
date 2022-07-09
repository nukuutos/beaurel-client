import React from 'react';

const Crosshairs = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M31.25 14H29.3522C28.4827 8.14531 23.8547 3.51725 18 2.64775V0.75C18 0.335812 17.6642 0 17.25 0H14.75C14.3358 0 14 0.335812 14 0.75V2.64775C8.14531 3.51725 3.51725 8.14531 2.64775 14H0.75C0.335812 14 0 14.3358 0 14.75V17.25C0 17.6642 0.335812 18 0.75 18H2.64775C3.51725 23.8547 8.14531 28.4827 14 29.3522V31.25C14 31.6642 14.3358 32 14.75 32H17.25C17.6642 32 18 31.6642 18 31.25V29.3522C23.8547 28.4827 28.4827 23.8547 29.3522 18H31.25C31.6642 18 32 17.6642 32 17.25V14.75C32 14.3358 31.6642 14 31.25 14ZM18 25.2896V22.75C18 22.3358 17.6642 22 17.25 22H14.75C14.3358 22 14 22.3358 14 22.75V25.2896C10.3641 24.5145 7.48644 21.6402 6.71037 18H9.25C9.66419 18 10 17.6642 10 17.25V14.75C10 14.3358 9.66419 14 9.25 14H6.71037C7.4855 10.3641 10.3598 7.48644 14 6.71037V9.25C14 9.66419 14.3358 10 14.75 10H17.25C17.6642 10 18 9.66419 18 9.25V6.71037C21.6359 7.4855 24.5136 10.3598 25.2896 14H22.75C22.3358 14 22 14.3358 22 14.75V17.25C22 17.6642 22.3358 18 22.75 18H25.2896C24.5145 21.6359 21.6402 24.5136 18 25.2896ZM18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16C14 14.8954 14.8954 14 16 14C17.1046 14 18 14.8954 18 16Z" />
  </svg>
);

export default Crosshairs;
