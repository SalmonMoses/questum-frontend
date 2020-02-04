import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './loginPage'
import LoginUser from "./loginUser"
import { createMuiTheme, ThemeProvider, fade } from '@material-ui/core';

// Просто набросок, чтобы потом менять было удобнее. Тему удобно создавать с помощью вот этого: https://material.io/resources/color/#!/?view.left=0&view.right=0
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a6a55c',
      main: '#767630',
      dark: '#484b02',
      contrastText: fade('#ffffff', 0.85)
    },
    secondary: {
      light: '#ffb851',
      main: '#aa0d0a',
      dark: '#b2741a',
      contrastText: fade('#ffffff', 0.73)
    },
    background: {
      default: '#e1e2e1',

    },
    text: {
      primary: fade('#000000', 0.55),
      secondary: fade('#000000', 0.55),
      hint: fade('#000000', 0.55)
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginUser />
    </ThemeProvider>
  );
}

export default App;
