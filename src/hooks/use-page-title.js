import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  appointmentsSeo,
  forgotPasswordSeo,
  indexSeo,
  mastersSeo,
  messagesSeo,
  notFoundSeo,
  profileSeo,
  searchSeo,
  servicesSeo,
  signInSeo,
  signUpSeo,
  timetableSeo,
} from './use-page-seo/descriptions';

const usePageSeo = () => {
  const { firstName, lastName } = useSelector((state) => state.profile);
  const [seo, setSeo] = useState({ title: 'Beaurel', description: '' });
  const router = useRouter();

  const { pathname } = router;

  useEffect(() => {
    switch (pathname) {
      case '/[id]':
        setSeo(profileSeo(firstName, lastName));
        break;
      case '/search':
        setSeo(searchSeo);
        break;
      case '/appointments':
        setSeo(appointmentsSeo);
        break;
      case '/messages':
        setSeo(messagesSeo);
        break;
      case '/services':
        setSeo(servicesSeo);
        break;
      case '/timetable':
        setSeo(timetableSeo);
        break;
      case '/masters':
        setSeo(mastersSeo);
        break;
      case '/settings':
        setSeo(servicesSeo);
        break;
      case '/sign-in':
        setSeo(signInSeo);
        break;
      case '/sign-up':
        setSeo(signUpSeo);
        break;
      case '/forgot-password':
        setSeo(forgotPasswordSeo);
        break;
      case '/not-found':
        setSeo(notFoundSeo);
        break;
      case '/':
        setSeo(indexSeo);
        break;
      default:
        setSeo(indexSeo);
        break;
    }
  }, [pathname, firstName, lastName]);

  return seo;
};

export default usePageSeo;
