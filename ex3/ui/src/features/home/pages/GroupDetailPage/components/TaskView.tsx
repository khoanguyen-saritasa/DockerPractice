import { CheckCircle, Send } from '@mui/icons-material';
import { Chip, Menu, MenuItem } from '@mui/material';
import React, { FC, useState } from 'react';
import { Task } from 'src/models/task';

interface Props {

  /** Task. */
  readonly task: Task;

  /** Whether task is assigned or not. */
  readonly isTaskAssigned: boolean;

  /** Handle task item clicked. */
  readonly onTaskClick: (task: Task) => void;
}

export const TaskView: FC<Props> = ({ task, isTaskAssigned, onTaskClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const onMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleTaskClick = () => {
    onTaskClick(task);
    handleCloseMenu();
  };

  const MENU_ID = `task-menu-${task.id}`;

  return (
    <>
      <Chip
        aria-controls={isOpen ? MENU_ID : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        color={isTaskAssigned ? 'success' : undefined}
        icon={ isTaskAssigned ? <CheckCircle fontSize="small" /> : <Send fontSize="small" /> }
        clickable
        onClick={onMenuClick}
        label={task.name}
      />
      <Menu
        id={MENU_ID}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleTaskClick}>
          {isTaskAssigned ? 'Retrieve task' : 'Send task'}
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>See detail</MenuItem>
      </Menu>
    </>
  );
};
