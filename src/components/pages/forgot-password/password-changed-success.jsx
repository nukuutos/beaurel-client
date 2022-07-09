import { useRouter } from 'next/router';
import React from 'react';
import ChevronRight from '../../base/icons/chevron-right';

const PasswordChangedSuccess = () => {
  const router = useRouter();
  const goToSignIn = () => router.push('/sign-in');

  return (
    <div className="forgot-password">
      <img className="forgot-password__svg" alt="Become master" src="/svg/reset-password.svg" />

      <p className="forgot-password__text  mt-8">Вы успешно поменяли пароль!</p>

      <span onClick={goToSignIn} className="forgot-password__link btn-text btn-text--visit">
        Перейти на страницу входа <ChevronRight />
      </span>
    </div>
  );
};

export default PasswordChangedSuccess;
