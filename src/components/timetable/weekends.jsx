import React, { useState } from "react";
import { FieldArray, insert } from "formik";
import Modal from "../utils/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import insertElementInSortedArray from "./utils/insert-element-in-sorted-array";
import weekdaysRU from "./utils/weekdays-ru";
import useMediaQuery from "../../hooks/use-media-query";

const Weekends = ({ weekends, update, editParentState, initialValues, setFieldValue }) => {
  const [editState, setEditState] = editParentState;
  const { isEditing, element } = editState;
  const isDisabled = update || (isEditing && !element.weekends);
  const isPhone = useMediaQuery(600);

  return (
    <>
      <label className="timetable-card__label  mt-5">Выхоные:</label>
      <span className="timetable-card__value ml-1 mt-5">
        {weekends.length ? weekends.map((weekdayNum) => weekdaysRU[weekdayNum]).join(" ") : "-"}
      </span>

      {element.weekends && (
        <FieldArray
          name="auto.weekends"
          render={({ remove, insert }) => (
            <Modal
              isMobileBackground
              onClickClose={() => {
                setEditState({ isEditing: false, element: { ...editState, weekends: false } });
                setFieldValue("auto.weekends", initialValues.auto.weekends);
              }}
            >
              <div className={`weekends weekends--mobile ${isPhone ? "" : "card"}`}>
                {isPhone && (
                  <nav className={`modal__back-bar card card--layout`}>
                    <div className="back-bar__main">
                      <FontAwesomeIcon
                        onClick={() => {
                          setEditState({ isEditing: false, element: { ...editState, weekends: false } });
                          setFieldValue("auto.weekends", initialValues.auto.weekends);
                        }}
                        className="back-bar__icon mr-6"
                        icon="arrow-left"
                      />
                      Выходные
                    </div>
                  </nav>
                )}

                {!isPhone && <h2 className="weekends__heading heading">Выходные</h2>}
                <p className="weekends__text mt-6">Выбери свои выходные!</p>

                <div className="weekends__days">
                  {weekdaysRU.map((russianWeekdayName, weekdayIndex) => {
                    const onPop = {
                      onClick: () => remove(weekends.indexOf(weekdayIndex)),
                      className: "weekends__day--exception",
                    };

                    const onPush = {
                      onClick: () => insertElementInSortedArray(weekdayIndex, weekends, insert),
                      className: "",
                    };

                    const { onClick, className } = weekends.includes(weekdayIndex) ? onPop : onPush;

                    return (
                      <div
                        name={`auto.weekends.${weekdayIndex}`}
                        className={`weekends__day mt-6 ${className}`}
                        onClick={onClick}
                        key={weekdayIndex}
                      >
                        {russianWeekdayName.toUpperCase()}
                      </div>
                    );
                  })}
                </div>

                <div
                  onClick={() => {
                    setEditState({ isEditing: false, element: { ...editState, weekends: false } });
                  }}
                  className="weekends__button btn btn--primary mt-6"
                >
                  Изменить
                </div>

                {/* {isPhone && (
                  <button
                    onClick={() => {
                      setEditState({ isEditing: false, element: { ...editState, weekends: false } });
                      setFieldValue("auto.weekends", initialValues.auto.weekends);
                    }}
                    className={`weekends__button btn btn--primary btn--gray mt-4`}
                  >
                    Отменить
                  </button>
                )} */}
              </div>
            </Modal>
          )}
        />
      )}

      {!isDisabled && (
        <div
          onClick={() => setEditState({ isEditing: true, element: { ...editState, weekends: true } })}
          className={`timetable-card__btn-edit ${isPhone ? "timetable-card__btn-edit--bottom" : ""} btn-icon`}
        >
          <FontAwesomeIcon icon="pen" />
        </div>
      )}
    </>
  );
};

export default Weekends;
