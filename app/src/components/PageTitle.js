import React from 'react'
import Typography from '@material-ui/core/Typography';
import logo_transparent from '../Logo/logo_transparent.png';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import pathLocations from '../data/pathLocations'
const useStyles = makeStyles((theme) => ({
    logo:{
        height: 70
    },
    navLogo:{
        height:25
    },
    heading:{
        fontSize: 25,
        // paddingTop: '1.1%'
    },
    container:{ 
        height: 32,
        display: 'flex',
        cursor: 'pointer'
    }
}));
export default function PageTitle(props) {
    const isNav = props.nav || false
    const classes = useStyles();
    const _handleOnClick = () => {
        window.location.href = pathLocations.root
    }
    return (
        <div onClick={_handleOnClick} className={classes.container}>
            <img src={logo_transparent} className={clsx({ 
                [classes.logo]:!isNav,
                [classes.navLogo]:isNav,
            })} alt="bylink-logo"/>
            <Typography variant="h2" color="error" align="center" paragraph className={clsx({[classes.heading]:isNav})}>
                URL Shortener
            </Typography> 
        </div>  
    )
}
