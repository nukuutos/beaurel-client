import { useRouter } from 'next/router';
import { useState } from 'react';

const useProfile = (user) => {
  const [isCustomerProfile, setIsCustomerProfile] = useState(false);
  const { username, _id, role } = user;

  const router = useRouter();

  const goToMasterProfile = () => router.push('/[id]', `/${username || _id}`);
  const openCustomerCard = () => setIsCustomerProfile(true);
  const closeCustomerCard = () => setIsCustomerProfile(false);

  const openProfile = role === 'master' ? goToMasterProfile : openCustomerCard;

  const handleClicks = { openProfile, closeCustomerCard };

  return [isCustomerProfile, handleClicks];
};

export default useProfile;
