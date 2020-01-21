import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './loginPage'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

// Просто набросок, чтобы потом менять было удобнее. Тему удобно создавать с помощью вот этого: https://material.io/resources/color/#!/?view.left=0&view.right=0
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4ebaaa',
      main: '#00897b',
      dark: '#005b4f',
      contrastText: '#000000'
    },
    secondary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#ffffff'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  );
}

export default App;
