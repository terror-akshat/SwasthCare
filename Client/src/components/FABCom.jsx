import { useState } from 'react';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DialogForm from './RegistrationForm.jsx';

const FABCom = ({ addPatient }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
        }}
      >
        <Tooltip title="Add patient" arrow>
          <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>

      {/* Dialog Form Component */}
      <DialogForm open={open} handleClose={() => setOpen(false)} addPatient={addPatient} isEdit={false} />
    </>
  );
};

export default FABCom;
