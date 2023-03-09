import { CheckCircle, Send } from '@mui/icons-material';
import { Chip, Menu, MenuItem } from '@mui/material';
import React, { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Task } from 'src/models/task';

interface Props {

  /** Task. */
  readonly task: Task;

  /** Whether task is assigned or not. */
  readonly isTaskAssigned: boolean;

  /** Handle task item clicked. */
  readonly onTaskClick?: (task: Task) => void;

  /** Whether menu is showed when clicked task or not. */
  readonly shouldHideMenu?: boolean;
}

export const TaskItem: FC<Props> = ({ task, isTaskAssigned, shouldHideMenu = false, onTaskClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [, setSearchParams] = useSearchParams();
  const isOpen = Boolean(anchorEl);
  const onMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleTaskClick = () => {
    onTaskClick?.(task);
    if (!shouldHideMenu) {
      handleCloseMenu();
    }
  };

  const handleViewDetail = () => {
    setSearchParams({ taskId: task.id.toString() });
    if (!shouldHideMenu) {
      handleCloseMenu();
    }
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
        onClick={shouldHideMenu ? handleViewDetail : onMenuClick}
        label={task.name}
      />
      <Menu
        hidden={shouldHideMenu}
        id={MENU_ID}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleTaskClick}>
          {isTaskAssigned ? 'Retrieve task' : 'Send task'}
        </MenuItem>
        <MenuItem onClick={handleViewDetail}>See detail</MenuItem>
      </Menu>
    </>
  );
};
