import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useGetWorks from './display-master-works/use-get-works';
import MainMasterWorks from './main-master-works';
import NoMasterWorksCustomer from './no-master-works-customer';

const MasterWorks = ({ onClickClose }) => {
  const [{ works }, { id, username }] = useSelector((state) => [state.work, state.auth]);
  const { asPath } = useRouter();
  const isLoading = useGetWorks();

  const isOwner = asPath === `/${id}` || asPath === `/${username}`;
  const isWorks = works.length;

  return isOwner || isWorks || isLoading ? (
    <MainMasterWorks isLoading={isLoading} onClickClose={onClickClose} />
  ) : (
    <NoMasterWorksCustomer onClickClose={onClickClose} />
  );
};

export default MasterWorks;
