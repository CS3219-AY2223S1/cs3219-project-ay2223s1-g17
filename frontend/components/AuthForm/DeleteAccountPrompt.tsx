import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleDeleteAccount: () => Promise<void>;
};

const DeleteAccountPrompt: FC<Props> = ({
  open,
  handleClose,
  handleDeleteAccount,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Account Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure that you want to delete your account? This action is
          irreversible
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={handleDeleteAccount}
        >
          Yes
        </Button>
        <Button variant="contained" color="error" onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountPrompt;
