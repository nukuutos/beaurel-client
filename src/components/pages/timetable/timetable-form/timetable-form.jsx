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
import useUpdateTimetableState from './use-update-timetable-state';

const TimetableForm = () => {
  const { update } = useSelector((state) => state.timetable);

  const [updateState, updateActions] = useUpdateTimetableState();

  const [state, actions] = useEditState();

  const initialValues = useGetInitialValues();

  const [handleSubmit, isLoading] = useOnSubmit(updateActions);

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

            {!update.date && <FormButtons editState={state} {...updateActions} {...formikProps} />}

            {updateState.isVisible && (
              <UpdateModal
                updateState={updateState}
                isLoading={isLoading}
                {...updateActions}
                {...formikProps}
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default TimetableForm;
