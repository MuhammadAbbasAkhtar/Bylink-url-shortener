import React, {useEffect, useState} from 'react';
import {  makeStyles,ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import theme from '../../theme'
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