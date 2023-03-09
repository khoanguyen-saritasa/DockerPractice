import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store';
import { VocabularyActions } from 'src/store/vocabulary/dispatchers';
import { selectVocabulariesByByTaskId } from 'src/store/vocabulary/selectors';

export const TaskDetail: FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const vocabularies = useAppSelector(selectVocabulariesByByTaskId);
  const taskId = searchParams.get('taskId');

  useEffect(() => {
    if (taskId == null) {
      return;
    }
    dispatch(VocabularyActions.getByTaskId(Number(taskId)));
  }, [dispatch, taskId]);

  if (taskId == null || vocabularies.length === 0) {
    return <Typography>Choose task to view its detail</Typography>;
  }
  return (
    <div>
      <Typography fontSize='1.3rem' mb={3}>Task: {vocabularies[0].taskName}</Typography>
      {vocabularies.map(vocabulary => (
        <Accordion key={vocabulary.id}>
          <AccordionSummary sx={{ bgcolor: 'burlywood' }}>
            <Typography>{vocabulary.english}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Typography component={'span'} fontWeight={600}>Russian:</Typography>{' '}
              {vocabulary.russian}
            </Typography>
            <Typography>
              <Typography component={'span'} fontWeight={600}>Vietnamese:</Typography>{' '}
              {vocabulary.vietnamese}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
