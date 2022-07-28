import { useRouter } from 'next/router';

const useGoTo = () => {
  const router = useRouter();
  const goToSearch = () => router.push('/search');
  const goToSignUp = () => router.push('/sign-up');

  return { goToSearch, goToSignUp };
};

export default useGoTo;
