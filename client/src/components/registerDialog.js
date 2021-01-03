import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function RegisterDialog({open, setOpen, register, loader}) {

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName(null);
    setEmail(null);
    setOpen(false);
  };

  const registerUser = () => {
      console.log(email,name);
    register(email, name);
    // setEmail(null);
    // setName(null);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To register yourself, please enter your name, email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
           <TextField
            margin="dense"
            id="name"
            label="Full name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
            {
                loader ? <div style={{display:'flex', justifyContent:'center', width:'100%'}}><CircularProgress/></div> : 
                <>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={registerUser} color="primary">
                    Register
                </Button>
                </>
            }
        </DialogActions>
      </Dialog>
    </div>
  );
}