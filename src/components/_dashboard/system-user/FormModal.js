/* eslint-disable */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import UserNewForm from './UserNewForm';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function FormModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={handleOpen} variant="contained" startIcon={<Icon icon={plusFill} />}>New User</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UserNewForm />
        </Box>
      </Modal>
    </Box>
  );
}