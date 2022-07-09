import { Form, Formik } from 'formik';
import ChoiceCards from '../choice-cards';
import WorkingDay from './working-day';
import Weekends from './weekends';
import TimetableAuto from './timetable-auto';
import SessionTime from './session-time';
import useOnSubmit from './use-on-submit';
import VisualTimetableManually from './visual-timetable-manually/visual-timetable-manually';
import ProgressBar from '../../../shared/progress-bar/progress-bar';
import useProgress from '../use-progress';
import { createTimetableSchema } from '../../schema';

const CreateTimetableForm = () => {
  const [state, setState, actions] = useProgress();

  const { current } = state;
  const { goNext, resetProgress } = actions;

  const [handleSubmit, isLoading] = useOnSubmit();

  return (
    <Formik
      validationSchema={createTimetableSchema}
      initialValues={{
        sessionTime: 60,
        type: 'auto',

        auto: {
          workingDay: { startAt: 600, endAt: 1020 },
          exceptions: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
          weekends: [],
        },

        manually: {
          appointments: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
          hours: 540,
          mins: 0,
        },
      }}
      onSubmit={handleSubmit}
    >
      {(props) => {
        const { type } = props.values;
        const stepsCount = type === 'auto' ? 5 : 3;

        return (
          <>
            <ProgressBar count={stepsCount} state={[state, setState]} />
            <Form className="create-timetable__form">
              {current === 1 && <SessionTime goNext={goNext} {...props} />}
              {current === 2 && (
                <ChoiceCards resetProgress={resetProgress} goNext={goNext} {...props} />
              )}
              {type === 'auto' && current === 3 && <WorkingDay goNext={goNext} {...props} />}
              {type === 'auto' && current === 4 && <Weekends goNext={goNext} {...props} />}
              {type === 'auto' && current === 5 && <TimetableAuto {...props} />}
              {type === 'manually' && current === 3 && (
                <VisualTimetableManually goNext={goNext} {...props} />
              )}
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default CreateTimetableForm;
