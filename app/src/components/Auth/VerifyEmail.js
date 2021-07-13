import React, { useState, useEffect } from 'react';
import { CssBaseline, Typography, Fab,  Container,CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import pathLocations from '../../data/pathLocations'
import {  apiGet } from '../../helpers/APIRequests'
import { setToken } from '../../helpers/UserAuth'
import { changePageTitle } from '../../helpers/common'
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';

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
const progressStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    buttonHide:{
        opacity : 0
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -66,
      left: -11,
      zIndex: 1,
    },
    infoText:{
        marginTop: '37%',
        marginLeft: '-14%',
    },
    fabProgressOnLogin:{
        top: -23,
        left: -23,
        color: green[500],
        position: 'absolute',
        zIndex: 1,
    }
}));

export default function VerifyEmail() {
    const classes = useStyles();
    const progressClasses = progressStyles()
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [infoText, setInfoText] = useState('Verifying....')
    const [isVerified, setVerified] = useState(false)
    const [error, setError] = useState('')
    
    useEffect(() => {
        handleButtonClick()
        changePageTitle('Verify Email')
        //clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const buttonClassname = clsx({
        [progressClasses.buttonSuccess]: success,
        [progressClasses.buttonHide]:isVerified
    });
    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            var path = window.location.pathname
            var token = path.split('/')
            token = token[token.length-1]
            apiGet(`/api/auth/verify/${token}`, res =>{
                
                if(!res.success){
                    setError(res.message)
                    localStorage.removeItem('token')
                }
                if(res.data.token){
                    setTimeout(() => {
                        setSuccess(true)
                        setLoading(false)
                        setInfoText('Verified!')
                        setError('')
                        setToken(res.data.token)
                        setTimeout(() => {
                            handleLogin()
                        }, 1000);
                    },4000)
                }
            })   
        }
    };
   
    
    const handleLogin = () => {
        setInfoText('Loggin in!')
        setLoading(true);
        setVerified(true)

        setTimeout(() => {
            setSuccess(true);
            setLoading(false);
            setInfoText('')
            var myHistory = [];
            myHistory.push("verify");
            window.history.replaceState({}, "My Account", pathLocations.myAccount);
            window.location = pathLocations.myAccount
        }, 4000);
    }
    

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        
        <div className={progressClasses.root}>
            {error === '' &&
            <div className={progressClasses.wrapper}>
                {success &&
                <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassname}  
                >
                    {(success && !isVerified) ? <CheckIcon fontSize="large"/> : <></>}
                </Fab> }
                {loading && <CircularProgress size={100} className={clsx({
                    [progressClasses.fabProgress]:!isVerified,
                    [progressClasses.fabProgressOnLogin]:isVerified,
                })} />}
                 <Typography variant="h5" gutterBottom className={progressClasses.infoText}>
                        {infoText}
                </Typography>
            </div> }
        </div>
           {error !== '' ? error:''}
      </div>
     
    </Container>
  );
  
}