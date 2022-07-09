import { useRouter } from 'next/router';

const useGoTo = () => {
  const router = useRouter();
  const goToSearch = () => router.push('/search');
  const goToSignIn = () => router.push('/sign-in');

  return { goToSearch, goToSignIn };
};

export default useGoTo;
