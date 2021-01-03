import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import RatingDialog from './ratingDialog';
import HistoryTable from './history';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));


export default function CustomCard({user, index, contract, accounts, isRegistered }) {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState(null);
  const [rateDialog, setRateDialog] = useState(false);
  const [historyDialog, setHistoryDialog] = useState(false);
  const [loader, setLoader] = useState(false);
  const [allHistory, setallHistory] = useState([]);
  const [rateGotChanged, setRateGotChanged] = useState(false);

  useEffect(() => {
    getUserDetails();    
    getUserHistory();
  }, [contract, user]);

  useEffect(() => {
    if(rateGotChanged) {
        getUserDetails();
        getUserHistory();
        setRateGotChanged(false);
    }
  }, [rateGotChanged])

  const getUserDetails = async() => {
      if(contract && user) {
          const res = await contract.methods.registeredUsers(user).call();
          console.log(res);
          setUserDetails(res);
      }
  }

  const rate = async(address,rating) => {
    setLoader(true);
    const res = await contract.methods.rate(address, rating).send({from:accounts[0]});
    setRateDialog(false);
    setLoader(false);
    setRateGotChanged(true);
    console.log(res);
  }

  const getUserHistory = async() => {
    if(contract && user) {
      const res = await contract.methods.getUserRating(user).call();
      console.log(res);
      setallHistory(res);
    }
  }

  return (
    <Grid item key={user} xs={12} sm={6} md={4} style={{backgroundColor: accounts[0] === user ? 'red' : 'white'}}>
    <Card className={classes.card} >
      <CardMedia
        className={classes.cardMedia}
        image={ index % 2 == 0 ? "https://cdn1.iconfinder.com/data/icons/avatar-97/32/avatar-02-512.png" : "https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" }
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
          {
              userDetails ? 
                <>
                <Typography gutterBottom variant="h5" component="h2">
                Name: {userDetails.name} <hr/>
                </Typography>
                <Typography>
                Email: {userDetails.email} <hr/>
                Address: {user} <hr/>
                Rating: {userDetails.avgRating/10**18} <hr/>
                </Typography>
                </> :
                <></>
          }
        
      </CardContent>
      <CardActions>
          {
              isRegistered?
              <>
               <Button size="small" color="primary" onClick={() => setRateDialog(true)}>
                Rate
                </Button>
                <Button size="small" color="primary" onClick={() => setHistoryDialog(true)}>
                History
                </Button>
              </> :<></>
          }
       
      </CardActions>
    </Card>
    <RatingDialog user={user} open={rateDialog} setOpen={setRateDialog} rate={rate} loader={loader}/>
    <HistoryTable open={historyDialog} setOpen={setHistoryDialog} loader={loader} allHistory={allHistory}/>
  </Grid>
  );
}