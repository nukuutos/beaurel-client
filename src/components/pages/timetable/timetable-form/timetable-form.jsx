import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { editTimetableSchema } from '../schema';
import BaseSettings from './base-settings/base-settings';
import FormButtons from './form-buttons';
import TimetableAuto from './timetable-auto/timetable-auto';
import TimetableManually from './timetable-manually/timetable-manually';
import TimetableType from './timetable-type';
import UpdateModal from './update-modal/update-modal';
import useGetInitialValues from './use-get-initial-values';
import useOnSubmit from './use-on-submit';

const TimetableForm = () => {
  const { update } = useSelector((state) => state.timetable);

  const [updateTimetable, setUpdateTimetable] = useState({
    isVisible: false,
    servicesCountToUpdate: null,
    step: 0,
  });

  const [state, setState] = useState({
    isEditing: false,
    element: { sessionTime: false, weekends: false, workingDay: false },
  });

  const initialValues = useGetInitialValues();

  const [handleSubmit, isLoading] = useOnSubmit(setUpdateTimetable);

  const editState = [state, setState];

  return (
    <Formik
      validationSchema={editTimetableSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(formikProps) => {
        const { type } = formikProps.values;

        return (
          <Form className="timetable__form">
            <BaseSettings {...formikProps} editState={editState} />
            <TimetableType {...formikProps} editState={editState} />

            {type === 'auto' ? (
              <TimetableAuto editState={editState} {...formikProps} />
            ) : (
              <TimetableManually editState={editState} {...formikProps} />
            )}

            {!update.date && (
              <FormButtons
                setUpdateTimetable={setUpdateTimetable}
                editState={editState}
                {...formikProps}
              />
            )}

            {updateTimetable.isVisible && (
              <UpdateModal
                {...formikProps}
                isLoading={isLoading}
                updateTimetableState={[updateTimetable, setUpdateTimetable]}
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default TimetableForm;
