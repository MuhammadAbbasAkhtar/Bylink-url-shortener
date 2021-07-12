/* eslint-disable */
import { createMuiTheme }  from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    //primary: { 500: '#467fcf' },
    primary:{
        light:'#7986cb',
        main: '#3f51b5',
        dark: '#303f9f',
        contrastText: '#fff'
    },
    secondary: {
        light: '#ff4081',
        main: '#f50057',
        dark: '#c51162',
        contrastText: '#fff'
    },
    error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff'
    },
    warning: {
        light: '#ffb74d',
        main: '#ff9800',
        dark: '#f57c00',
        contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    info: {
        light: '#64b5f6',
        main: '#2196f3',
        dark: '#1976d2',
        contrastText: '#fff'
    },
    success: {
        light: '#81c784',
        main:  '#4caf50',
        main:  '#5dc87f',
        dark:  '#388e3c',
        contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    facebookButton:{
        background: '#2e45a3',
        text: '#fff'
    },
    googleButton:{
        background: '#4263eb',
        text: '#fff'
    },
    normalButton:{
        background: '#f44336',
        main:  '#f44336',
        text: '#fff'
    },
    navButton:{
        background: '#f44336',
        main:  'rgba(0,0,0,0)',
        text: '#f44336',
        contrastText: '#f44336'
    },
    submitBtn:{
        background: '#f44336',
        main:  '#f44336',
        text: '#fff'
    }
  },
  
  
})
export default theme