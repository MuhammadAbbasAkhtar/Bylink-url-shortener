
import React, {useState} from 'react';
import { Button, IconButton,Typography, TextField,
    InputAdornment, FormControl, OutlinedInput, Tooltip
} from '@material-ui/core';
import { makeStyles, createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import {PublishRounded, FileCopyTwoTone} from '@material-ui/icons';
import theme from '../../theme'
import { apiPost } from '../../helpers/APIRequests';


const useStyles = makeStyles((theme) => ({
    root: {
        
        '& > *': {
          margin: theme.spacing(1),
        },
    },
   
    b1Text:{
        color: theme.palette.primary.contrastText,
        // "& input":{
        //     color: theme.palette.primary.contrastText + ' !important',
        // }
    },
    textField1:{
        color: theme.palette.primary.contrastText + ' !important',
        "& #url-helper-text, input":{
            color: theme.palette.primary.contrastText + ' !important',
        }
        
    },
    shorturl:{
        color: theme.palette.primary.contrastText + ' !important',
        "& #url-helper-text, input":{
            color: theme.palette.primary.contrastText + ' !important',
        }
        
    },
    margin1: {
        margin: theme.spacing(1),
    },
    textFieldBtn:{
        color: theme.palette.primary.contrastText,
        background: theme.palette.error.main,
        "& :hover":{
            background: theme.palette.error.main
        }
    },
    textFieldBtnIcon:{
        transform: 'rotate(90deg)'
    },
    form:{
        display:"contents"
    },
    textField: {
        width: '100%',
    },
    textfieldButton:{
        position: 'absolute',
        top: '39%',
        right: '2%',
        padding: "0.8%"
    }
    
}))

const buttonTheme =  createMuiTheme({
    palette: {
      primary: theme.palette.submitBtn,
    },
});

export default function UrlForm(props){
    const classes = useStyles();
    const [isReadOnly, setReadonly] = useState(false)
    const [urlValue, setUrlValue] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [isCopied, setIsCopied] = useState(false)
    const [error, setError] = useState('')
    const handleInput = (e) => {
        setUrlValue(e.target.value)
    }
    const handleButtonClick = () => {
       
        apiPost("/api/url/short", {origUrl: urlValue}, (res) =>{
            if(res.success){
                setReadonly(true)
                 var shortcode =window.location.origin+'/r/'+ res.shortcode
                 
                setShortUrl(shortcode)
                setError('')
            } else{
                setError(res.message)
            }
        }, (err) => console.log(err))
        
        
    }
    const handleClickCopyUrl = () => {
        navigator.clipboard.writeText(shortUrl)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 1000);
    }
    return(
        <>
            <Typography variant="h6" className={classes.b1Text}  align="center" >Enter Link to shorten</Typography>
            {!isReadOnly && 
                <div className={classes.form} >
                    <TextField
                        id="url"
                        label={error}
                        error={error === '' ? false:true}
                        style={{ margin: 8 }}
                        placeholder=""
                        helperText="https://*, http://*, 1.1.1.1, ftp://1.1.1.1 "
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        className={classes.textField1}
                        value={urlValue}
                        onChange={handleInput}
                    />
                    <ThemeProvider theme={buttonTheme}>
                        <Button variant="contained" color="primary" className={classes.textfieldButton}
                            onClick={handleButtonClick}
                            disableFocusRipple
                            disableRipple
                        >
                            <PublishRounded className={classes.textFieldBtnIcon}/>
                        </Button>
                    </ThemeProvider>
                    {/* <SubmitButton variant="contained" className={classes.textFieldBtn} onClick={handleButtonClick}>
                        <PublishRounded className={classes.textFieldBtnIcon}/>
                    </SubmitButton> */}
            </div>}
            {isReadOnly && 
                <FormControl className={`${classes.margin1} ${classes.textField}`} variant="outlined">
                {/* <TextField
                    id="url"

                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    className={classes.shorturl}
                    // InputProps={{
                    //     readOnly: true,
                    // }}
                    // value={shortUrl}
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"

                          >
                            <PublishRounded />
                          </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                /> */}
                <OutlinedInput 
                    type="text"
                    value={shortUrl}
                    endAdornment={
                        <InputAdornment position="end">
                            
                          <IconButton
                            aria-label="Copy short url"
                            edge="end"
                            onClick={handleClickCopyUrl}
                            labelWidth={70}
                          >
                            <Tooltip title="Copied" placement="right" 
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                open={isCopied}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                            >
                            <FileCopyTwoTone /> 
                          </Tooltip>
                          </IconButton>
                        </InputAdornment>
                      }
                />
              
                </FormControl>
            }
        </>
    )
}