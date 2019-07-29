import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Sidebar from './sidebar'
import Main from './main'

/* CSS FILES */
import '../assets/css/common.css'
import CssBaseline from '@material-ui/core/CssBaseline';

/* JS FILES */
import '../assets/js/script.js'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat'
    ]
  },
  palette: {
    primary: {
      main: '#131313',
    },
    secondary: {
      main: '#f5ee03',
    },
  },
});

export default function Template(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar />
      <Main open={open}>
        {props.children}
      </Main>
    </ThemeProvider>
  )
}