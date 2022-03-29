import { useSelector } from 'react-redux';

const useMasterTools = () => {
  const [{ isServices, isTimetable }, { role }] = useSelector((state) => [
    state.masterTools,
    state.auth,
  ]);

  const isMaster = role === 'master';
  const isMasterTools = (isServices && isTimetable) || !isMaster;

  return isMasterTools;
};

export default useMasterTools;
