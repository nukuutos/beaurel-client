import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';

const useSetViewed = ({ appointmentId, isSocket, userType, userId }) => {
  const { accessToken, id: authId } = useSelector((state) => state.auth);
  const [asyncAction] = useAsyncAction();

  const masterId = userType === 'master' ? authId : userId;
  const role = userType === 'master' ? 'master' : 'customer';

  useEffect(() => {
    const setAppointmentViewed = () => {
      const config = {
        method: 'put',
        url: `/master/${masterId}/appointment/${appointmentId}/viewed-state`,
        data: { role },
        accessToken,
      };

      asyncAction(config);
    };

    if (isSocket) setAppointmentViewed();
  }, [accessToken, asyncAction, role, userId, masterId, appointmentId, isSocket]);
};

export default useSetViewed;
