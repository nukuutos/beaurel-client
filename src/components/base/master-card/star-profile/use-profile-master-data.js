import { useSelector } from 'react-redux';

const useProfileMasterData = (masterDataProp) => {
  const { firstName, lastName, ratingStats, specialization, id } = useSelector(
    (state) => state.profile
  );

  const masterData = { firstName, lastName, ratingStats, specialization, _id: id };

  return masterDataProp || masterData;
};

export default useProfileMasterData;
