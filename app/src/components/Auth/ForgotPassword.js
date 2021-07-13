import React, { useEffect} from 'react';
import { Avatar, Button, CssBaseline, TextField,
  Link, Grid, Box, Typography, Container
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import pathLocations from '../../data/pathLocations'
import Copyright from '../Copyright'
import { changePageTitle } from '../../helpers/common'

const useStyles = makeStyles((theme) => ({
    root:{
        padding: theme.spacing(3, 2),
        height:'80vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPassword() {
  const classes = useStyles();
  useEffect(() => {
    changePageTitle('Reset Password')
  }, [])
  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={`${classes.paper}`}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Forgot Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            reset password
          </Button>
          <Grid container>
            <Grid item >
              <Link href={pathLocations.signup} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}