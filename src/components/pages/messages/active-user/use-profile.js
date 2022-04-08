import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const useProfile = () => {
  const [isCustomerProfile, setIsCustomerProfile] = useState(false);
  const { activeInterlocutor } = useSelector((state) => state.messages);
  const router = useRouter();

  const { _id, username, role } = activeInterlocutor;

  const goToMasterProfile = () => router.push('/[id]', `/${username || _id}`);
  const openCustomerCard = () => setIsCustomerProfile(true);
  const closeCustomerCard = () => setIsCustomerProfile(false);

  const openProfile = role === 'master' ? goToMasterProfile : openCustomerCard;

  const handleClicks = { openProfile, closeCustomerCard };

  return [isCustomerProfile, handleClicks];
};

export default useProfile;
