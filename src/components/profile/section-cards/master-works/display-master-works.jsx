import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAsyncAction from "../../../../hooks/use-async-action/use-async-action";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWorksSuccess } from "../../../../redux/work/actions";
import useMediaQuery from "../../../../hooks/use-media-query";

const MasterWork = ({ toCarouselView, work }) => {
  const { _id, title } = work;

  return (
    <figure onClick={toCarouselView} className="master-work">
      <img src={`http://localhost:5000/images/works/${_id}.png`} className="master-work__img" />
      <figcaption className="master-work__title">{title}</figcaption>
    </figure>
  );
};

const DisplayMasterWorks = ({ setParentState }) => {
  const [{ works, masterId }, { id: profileId }] = useSelector((state) => [state.work, state.profile]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const router = useRouter();
  const isPhone = useMediaQuery(600);

  const getWorks = async () => {
    const config = {
      method: "get",
      url: `/master/${profileId}/work`,
      accessToken: null,
    };

    const data = await asyncAction(config);

    if (works) dispatch(getWorksSuccess({ works: data.works, masterId: profileId }));
  };

  useEffect(() => {
    const queryMasterId = router.query.id;
    const isWorks = masterId === queryMasterId;
    if (!isWorks) getWorks();
  }, []);

  const toAddWork = () => setParentState((state) => ({ ...state, display: "add" }));

  return (
    <div className={`master-works ${isLoading ? "master-works--loading" : ""} ${isPhone ? "" : "card"}`}>
      {isLoading && <div className="spinner-with-background" />}

      {works.map((work, index) => {
        const toCarouselView = () => setParentState({ index, display: "carousel" });
        return <MasterWork key={index} work={work} toCarouselView={toCarouselView} />;
      })}
      <div onClick={toAddWork} className="master-works__add-work">
        <FontAwesomeIcon icon="plus" />
      </div>
    </div>
  );
};

export default DisplayMasterWorks;
