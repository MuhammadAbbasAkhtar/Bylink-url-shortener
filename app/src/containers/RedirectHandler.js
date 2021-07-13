import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography} from '@material-ui/core';
import { apiPost, getClientIP } from '../helpers/APIRequests';

import ErrorPages from '../components/ErrorPages'
const useStyles = makeStyles( theme => ({
    "@global": {
        body: {
            background: "linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)",
            // backgroundSize: '400% 400%',
            backgroundSize: '164% 115%',
            animation: 'animateBG 10s ease-in-out infinite'
        }
    },
    
    root:{
        display: "flex",
        justifyContent: "center",
        marginTop: "25%",
        marginLeft: "50%",
        transform: "translate(-50%, -50%)"
    },
    loaderText:{
        position: 'absolute',
        top: '4.5em',
        background: "-webkit-linear-gradient(#2ba2d2, #e83f7c)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        WebkitTextStroke: "0.6px #0000004a"
        // fontSize: "2.5rem",
        // marginBlock: "unset",
        // marginTop: "-7em"
    },
    loader:{
        "& svg":{
            backgroundColor: "linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)",
            backgroundSize: '164% 115%'
        }
    }
    
}))
function Loader(props){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress size={500} thickness={.0} className={classes.loader}/>
            <Typography variant="h3" className={classes.loaderText}>Redirecting</Typography>
        </div>
    )
}

class RedirectHandler extends Component {

    constructor(){
        super();
        this.state = {
            isError: false,
            clientip: ''
        }
    }
    async componentDidMount(){
        await getClientIP(res => {
            if(res.ip) this.setState({clientip:res.ip})
        })

        apiPost(`/api/url${window.location.pathname}`, {user:this.state.clientip}, res => {
            if(res.success){
                this.setState({isError:false})
                // console.log(res.url)
                window.location.href = res.url
            }
            else{
                this.setState({isError:true})
            }
        })
    }
    render() {
        const {isError } = this.state
        return (
            <>
                {isError ? <ErrorPages code={404} message="Bylink not found"/> : <Loader /> }
                
            </>
        );
    }
}

export default RedirectHandler;