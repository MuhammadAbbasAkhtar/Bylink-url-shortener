import React, {  useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { changePageTitle } from '../../helpers/common';
import logo_transparent from '../../Logo/logo_transparent.png';
import UrlForm from './UrlForm'
import NavBar from '../NavBar'
import PageTitle from '../PageTitle'
const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundImage: props => `url('${props.BGurl}')`
        }
    },
    root: {
        flexGrow: 1,
        height:'100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    headingGrid:{
        position: "absolute",
        left: "0%",
        top: "15%",

    },
    belowHeadingGrid:{
        position: "relative",
        left: "0%",
        top: "30%",
    },
    logo:{
        height: 70
    },
    footer:{
        position: "absolute",
        right: "11%",
        color: "#5f5440",
        filter: "invert(29%) sepia(45%) saturate(235%) hue-rotate(\n0deg\n) brightness(93%) contrast(84%)",
        top: "88%",
        fontWeight: "inherit",
        fontVariantCaps: "petite-caps",
        fontFamily: "Arial",
        fontSize: "16px",
        textShadow: '0px 0px 1px rgba(161, 150, 150, 1)',
        "& > a":{
            fontVariantCaps: "all-small-caps",
        }
    },
  

}))
export default function Landing(props) {
    const height = window.innerHeight
    const width = window.innerWidth
    const BGurl = `https://picsum.photos/id/794/${width}/${height}?blur=5`
    const classes = useStyles({BGurl});

    useEffect(() => {
        changePageTitle('Landing')
    }, [])

    return(
        <>
             <NavBar />
        <Container component="main" maxWidth="md" >
             <CssBaseline />
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" className={classes.headingGrid}>
                        {/* <img src={logo_transparent} className={classes.logo} alt="bylink-logo"/>
                        <Typography variant="h2" color="error" align="center" paragraph>
                                URL Shortener
                        </Typography>    */}
                        <PageTitle />
                    </Grid>
                    <Grid container justify="center" className={classes.belowHeadingGrid}>
                        <UrlForm />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        <footer className={classes.footer}> Created by <a href="https://github.com/MuhammadAbbasAkhtar/">Muhammad Abbas Akhtar</a></footer>   
        </>
    )
}