import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles} from '@material-ui/core/styles';
import NavBar from './NavBar';


const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        color:theme.palette.primary.contrastText
    },
    toolbar: theme.mixins.toolbar,
}));

export default function AppDrawer(props){
    const classes = useStyles();
    
    return(
        <div className={classes.root}>
            <CssBaseline />
            <NavBar drawerWidth={drawerWidth} pageTitle={props.pageTitle}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children} 
            </main>
        </div>
    )
}
