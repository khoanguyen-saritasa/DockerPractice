import { Button, List, ListItem } from '@mui/material';
import { Stack } from '@mui/system';
import { FC } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';

const menus = ['Group 1', 'Group 2', 'Group 3'];

export const AsideMenu: FC = () => {
  const params = useParams<{ groupId: string; }>();
  return (
    <Stack component="aside" flex={0.2} paddingX={3} py={1}>
      <List>
        {menus.map(group => (
          <ListItem key={group}>
            <Button
              fullWidth
              variant={params.groupId === group ? 'contained' : 'text'}
              component={RouterLink}
              to={group}
            >
              {group}
            </Button>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
