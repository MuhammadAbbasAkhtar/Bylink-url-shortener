import React, {useEffect, useState} from 'react';
import { fade, makeStyles,ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import theme from '../../theme'
import decodeToken from '../../helpers/decodeToken'
import {getToken } from '../../helpers/UserAuth'
import { apiGet }  from '../../helpers/APIRequests'
import pathLocations from '../../data/pathLocations';
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },  
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    },
    AppBar:{
        background: "transparent"
    }
}));

const buttonTheme =  createMuiTheme({
    palette: {
      primary: theme.palette.navButton,
    },
});
export default function NavBar(props) {
  const classes = useStyles();
  
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const handleButtonClick = () => {
    var redirectTo = ""
    if(!isUserLoggedIn) redirectTo= pathLocations.login
    else redirectTo = pathLocations.dashboard
    

    window.location.href = redirectTo
  }

  useEffect(() => {
    const token = getToken();
    apiGet('/api/auth/validate-token',(res)=> {
        if(res.success) setIsUserLoggedIn(true)
    }, (err) => console.log(err))
  }, [])

  const navMenu = (
      <div>
        {/* <Button
            edge="middle"
            color="secondary"
            variant="contained"
        >
         Login/signup     
        </Button> */}
         <ThemeProvider theme={buttonTheme}>
            <Button variant="contained" color="primary" className={classes.margin} disableElevation onClick={handleButtonClick}>
                {!isUserLoggedIn ? "Login/signup": "Dashboard" }
            </Button>
        </ThemeProvider>
    </div>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.AppBar} elevation={0}>
        <Toolbar>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
             {navMenu}           
          </div>
          <div className={classes.sectionMobile}>
           {navMenu}
          </div>
        </Toolbar>
      </AppBar>
    
    </div>
  );
}