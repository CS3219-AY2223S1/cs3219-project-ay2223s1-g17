import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  handleSaveHistory: () => Promise<void>;
};

const SaveHistoryPrompt: FC<Props> = ({ open, onClose, handleSaveHistory }) => {
  const handleYes = () => {
    handleSaveHistory();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Coding Session</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Would you like to save a snapshot if this coding session? If you
          choose to save, you can view the question, code and chats from this
          session in the History page in the future at any time.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={handleYes}>
          Yes
        </Button>
        <Button color="error" onClick={onClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveHistoryPrompt;
