import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { FC } from 'react';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleLeave: () => void;
};

const LeaveRoomPrompt: FC<Props> = ({ open, handleClose, handleLeave }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>End Coding Session</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure that you wish to exit this coding session without
          completing it? It will not be saved unless you complete it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={handleLeave}>
          Yes
        </Button>
        <Button variant="contained" color="error" onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveRoomPrompt;
