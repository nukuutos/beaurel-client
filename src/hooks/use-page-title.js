import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

const INDEX = '/';
const PROFILE = '/[id]';
const SEARCH = '/search';
const APPOINTMENTS = '/appointments';
const MESSAGES = '/messages';
const SERVICES = '/services';
const TIMETABLE = '/timetable';
const MASTERS = '/masters';
const SETTINGS = '/settings';
const SIGN_IN = '/sign-in';
const SIGN_UP = '/sign-up';
const FORGOT_PASSWORD = '/forgot-password';
const NOT_FOUND = '/not-found';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE: {
      const { firstName, lastName } = payload;

      return {
        title: `${firstName} ${lastName}`,
        description: 'Просмотриет Ваш профиль на Beaurel.',
      };
    }

    case SEARCH: {
      return {
        title: 'Поиск',
        description: 'Найдите своего мастера с помощью поиска мастеров на Beaurel.',
      };
    }

    case APPOINTMENTS: {
      return {
        title: 'Записи',
        description: 'Ваши записи к мастерам на Beaurel.',
      };
    }

    case MESSAGES: {
      return {
        title: 'Сообщения',
        description: 'Напишите сообщение вашему мастеру на Beaurel.',
      };
    }

    case SERVICES: {
      return {
        title: 'Услуги',
        description: 'Напишите сообщение вашему мастеру на Beaurel.',
      };
    }

    case TIMETABLE: {
      return {
        title: 'Расписание',
        description: 'Редактируйте и создавайте своё расписание на Beaurel.',
      };
    }

    case MASTERS: {
      return {
        title: 'Мастера',
        description: 'Просмотрите список ваших мастеров на Beaurel.',
      };
    }

    case SETTINGS: {
      return {
        title: 'Настройки',
        description: 'Настройка Вашего личного аккаунта.',
      };
    }

    case SIGN_IN: {
      return { title: 'Вход', description: 'Вход в личный кабинет Beaurel.' };
    }

    case SIGN_UP: {
      return {
        title: 'Регистрация',
        description: 'Совершите регистрацию на бьюти платформе Beaurel.',
      };
    }

    case FORGOT_PASSWORD: {
      return {
        title: 'Beaurel',
        description: 'Восстановите свой пароль на Beaurel.',
      };
    }

    case NOT_FOUND: {
      return {
        title: 'Beaurel',
        description: 'Ваша страница на Beaurel не найдена.',
      };
    }

    case INDEX: {
      return {
        title: '',
        description: 'Beaurel - платформа для бьюти мастеров и их клиентов.',
      };
    }

    default:
      return state;
  }
};

const initialState = { title: 'Beaurel', description: '' };

const usePageSeo = () => {
  const { firstName, lastName } = useSelector((state) => state.profile);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pathname } = useRouter();

  const setPageSeo = (type) => dispatch({ type });
  const setProfileSeo = (payload) => dispatch({ type: PROFILE, payload });

  useEffect(() => {
    if (pathname === PROFILE) {
      setProfileSeo({ firstName, lastName });
    } else {
      setPageSeo(pathname);
    }
  }, [pathname, firstName, lastName]);

  return state;
};

export default usePageSeo;
