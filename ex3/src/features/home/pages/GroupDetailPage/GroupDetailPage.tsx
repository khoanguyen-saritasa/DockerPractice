import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { FC } from 'react';
import { useParams } from 'react-router';

export const GroupDetailPage: FC = () => {
  const params = useParams<{ groupId: string; }>();
  return (
    <Stack>
      <Typography>{params.groupId}</Typography>
    </Stack>
  );
};
