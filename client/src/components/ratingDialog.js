import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
export default function RatingDialog({open, setOpen, rate, user, loader}) {


console.log(user);

  const [rateV, setRate] = useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setRate(1);
    setOpen(false);
  };

  const rateUser = () => {
    rate(user, rateV);
  }

  const handleChange = (_rate) => {
      console.log(_rate);
      setRate(_rate);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Rate user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To rate, please select one of the rate values.
          </DialogContentText>
        <Radio
            checked={rateV == 1}
            onChange={(e) =>handleChange(e.target.value)}
            value={1}
            color="default"
            name="radio-button-demo1"
        />
      <Radio
        checked={rateV == 2}
        onChange={(e) =>handleChange(e.target.value)}
        value={2}
        name="radio-button-demo2"
      />
      <Radio
        checked={rateV == 3}
        onChange={(e) =>handleChange(e.target.value)}
        value={3}
        name="radio-button-demo3"
      />
      <Radio
        checked={rateV == 4}
        onChange={(e) =>handleChange(e.target.value)}
        value={4}
        name="radio-button-demo4"
      />
      <Radio
        checked={rateV == 5}
        onChange={(e) =>handleChange(e.target.value)}
        value={5}
        name="radio-button-demo5"
      />
        </DialogContent>
        <DialogActions>
            {
                loader ? <div style={{display:'flex', justifyContent:'center', width:'100%'}}><CircularProgress/></div> : 
                <>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={rateUser} color="primary">
                    Rate
                </Button>
                </>
            }
        </DialogActions>
      </Dialog>
    </div>
  );
}