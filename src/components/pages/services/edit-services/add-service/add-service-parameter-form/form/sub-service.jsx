import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Trash from '../../../../../../base/icons/trash';
import Duration from '../../shared/duration';
import Price from '../../shared/price';
import UpdateDuration from '../../shared/update-duration';
import useIsUpdateDuration from '../../use-is-update-duration';
import Parameter from './parameter';

const SubService = ({ subService, remove, index }) => {
  const { update } = useSelector((state) => state.timetable);

  const isUpdateDuration = useIsUpdateDuration();
  const removeSubService = () => remove(index);

  return (
    <>
      <div className="add-service__parameter-and-btn">
        <Parameter name={`subServices.${index}.parameter`} />

        {index !== 0 && (
          <button
            type="button"
            onClick={removeSubService}
            className="add-service__delete btn-icon btn-icon--fail ml-2"
          >
            <Trash />
          </button>
        )}
      </div>
      {/* duration */}
      <div className="add-service__price-and-duration mt-6">
        <Duration
          className="add-service__duration mr-4"
          name={`subServices.${index}.duration`}
          inputClassName="input--icon"
          value={subService.duration}
        />
        <Price name={`subServices.${index}.price`} />
      </div>

      {isUpdateDuration && (
        <UpdateDuration
          name={`subServices.${index}.updateDuration`}
          value={subService.updateDuration}
          updateDate={update.date}
        />
      )}
    </>
  );
};
export default SubService;
