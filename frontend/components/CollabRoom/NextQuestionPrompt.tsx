import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';

type Props = {
  open: boolean;
  confirm: boolean;
  otherReject: boolean;
  isLastQuestion: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

const NextQuestionPrompt: FC<Props> = ({
  open,
  confirm,
  otherReject,
  isLastQuestion,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {isLastQuestion ? 'End Session' : 'Proceed to Next Question'}
      </DialogTitle>
      {otherReject ? (
        <>
          <DialogContent>
            <DialogContentText>
              The other user has rejected{' '}
              {isLastQuestion
                ? 'ending the session'
                : 'moving on to the next question'}
              . This prompt will automatically close in 3s.
            </DialogContentText>
          </DialogContent>
        </>
      ) : confirm ? (
        <>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CircularProgress sx={{ mb: 2 }} />
            <DialogContentText>
              Waiting for response from other user...
            </DialogContentText>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogContent>
            <DialogContentText>
              Are you ready to{' '}
              {isLastQuestion
                ? 'end the session'
                : 'proceed to the next question'}
              ?{' '}
              {isLastQuestion
                ? ''
                : 'You can now swap roles between interviewer and interviewee if you wish to do so.'}{' '}
              A snapshot coding session will be saved to your profile for you to
              reference any time in the future.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" onClick={handleConfirm}>
              Yes
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              No
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default NextQuestionPrompt;
