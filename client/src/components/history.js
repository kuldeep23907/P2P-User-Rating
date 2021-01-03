import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 1000
  },
});

function createData(index, name, email, timestamp, rating) {
  return { index, email, name, timestamp, rating };
}


export default function HistoryTable({open, setOpen, allHistory}) {

  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let r = allHistory.map((history,index) => {
        return createData(index, history.byEmail, history.byAddress, history.timestamp, history.rating);
    });
    setRows([...r]);
  }, [allHistory])

  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">History</DialogTitle>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Account</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.index}>
              <TableCell component="th" scope="row">
                {row.index}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
              <TableCell align="right">{moment.unix(row.timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Dialog>
  );
}