import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from './footer';
import CustomCard from './card';
import RegisterDialog from './registerDialog';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));

export default function Album({contract, accounts}) {

 
  const classes = useStyles();
  const [registerDialog, setRegisterDialog] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [users, setUsers] = useState([]);

  console.log(accounts);

  useEffect(() => {
    checkIfAddressRegistered();
  }, [isRegistered, contract, accounts]);

  useEffect(() => {
      getAllUsers();
  }, [contract,accounts]);

  const checkIfAddressRegistered = async()=> {
      if(contract && accounts.length !== 0){
        const res = await contract.methods.registeredAddresses(accounts[0]).call();
        if(res) {
            setIsRegistered(true);
        } else {
            setIsRegistered(false);
        }
      }
      
  }

  const getAllUsers = async() => {
    if(contract){
      const res = await contract.methods.getAllUsers().call();
      console.log(res);
      console.log(accounts[0]);
      console.log(...res.filter((u) => u === accounts[0]));
      console.log(...res.filter((u) => u !== accounts[0]));
    //   setUsers([...res.filter((u) => u === accounts[0]), ...res.filter((u) => u !== accounts[0])])
      setUsers([...res]);
    }
  }

  const register = async(email, name) => {
    setLoader(true);
    const res = await contract.methods.register(name, email).send({from:accounts[0]});
    setRegisterDialog(false);
    setLoader(false);
    setIsRegistered(true);
    setUsers([...users, accounts[0]]);
    console.log(res);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ThumbsUpDownIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            P2P User Rating
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              P2P Users Rating
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Once registered, you can rate any user you want. You can see any user's rating history.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                    {
                        isRegistered ?
                        <Grid item>
                        <Button variant="contained" color="primary" onClick={() => alert('Please click on history button on your user card with red border')}>
                          History
                        </Button>
                      </Grid> :
                      <Grid item>
                        <Button variant="contained" color="primary" onClick={() => setRegisterDialog(true)}>
                        Register
                        </Button>
                        </Grid>
                    }
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {users.map((user,index) => (
              <CustomCard user={user} index={index} contract={contract} accounts={accounts} isRegistered={isRegistered}/>
            ))}
          </Grid>
        </Container>
      </main>
      <RegisterDialog open={registerDialog} setOpen={setRegisterDialog} register={register} loader={loader} />
      <Footer/>
    </React.Fragment>
  );
}