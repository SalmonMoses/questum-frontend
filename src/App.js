import React from 'react';
import SignIn from './loginPage'
import LoginUser from "./loginUser"
import { createMuiTheme, ThemeProvider, fade } from '@material-ui/core';
import SignUp from "./SignUp"
import { SnackbarProvider } from 'notistack';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"


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
     <Router>
    <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={4}>
      <Switch>
        <Route exact path="/" component={LoginUser} />
        <Route exact path="/login/owner" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch> 
      </SnackbarProvider>
    </ThemeProvider>
    </Router>
  );
}

export default App;
