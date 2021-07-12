import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import pathLocations from '../../data/pathLocations'
import Copyright from '../Copyright';
import { apiPost } from '../../helpers/APIRequests'
import { setToken } from '../../helpers/UserAuth'
import { changePageTitle } from '../../helpers/common'
import * as auth from "../../helpers/UserAuth"
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

export default function SignIn() {
  const classes = useStyles();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  // const [formSuccess, setFormSuccess] = useState(null)
  const [loginError, setLoginError] = useState('')

  if(auth.isLoggedIn()){
    window.location.href = pathLocations.dashboard
  }
  const handleSumbit = () => {
    
    if(email !== '' && password !== ''){
      apiPost('/api/auth/login', {email, password}, res =>{
        console.log(res);
        if(!res.success){
          setLoginError(res.message)
        }
        if(res.data.token){
          setLoginError('')
          setToken(res.data.token)
          window.location = pathLocations.dashboard
        }

        
       
      })
    }
  }
  useEffect(() => {
    changePageTitle('Login')
  }, [])
  // if(!LoggedInRedirect()){
  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate method="POST">
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
            value={email}
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <br />
          { loginError !== '' && <Typography variant="body1" color="error" align="center">{loginError}</Typography> }
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSumbit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href={pathLocations.forgotPassword} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
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
  // }
}