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
import useEditState from './use-edit-state';
import useGetInitialValues from './use-get-initial-values';
import useOnSubmit from './use-on-submit';

const TimetableForm = () => {
  const { update } = useSelector((state) => state.timetable);

  const [updateTimetable, setUpdateTimetable] = useState({
    isVisible: false,
    servicesCountToUpdate: null,
    step: 0,
  });

  const [state, actions] = useEditState();

  const initialValues = useGetInitialValues();

  const [handleSubmit, isLoading] = useOnSubmit(setUpdateTimetable);

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
            <BaseSettings editState={state} {...actions} {...formikProps} />
            <TimetableType editState={state} {...formikProps} />

            {type === 'auto' ? (
              <TimetableAuto editState={state} {...actions} {...formikProps} />
            ) : (
              <TimetableManually editState={state} {...formikProps} />
            )}

            {!update.date && (
              <FormButtons
                setUpdateTimetable={setUpdateTimetable}
                editState={state}
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
