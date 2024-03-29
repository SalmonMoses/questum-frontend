import React, { useState, useEffect } from 'react';
import SignIn from './loginPage';
import LoginUser from "./loginUser";
import { createMuiTheme, ThemeProvider, fade } from '@material-ui/core'
import SignUp from "./SignUp"
import MainPageAdmin from "./components/MyGroups(MainPage)/mainPageAdmin"
import { SnackbarProvider } from 'notistack'
import NoMatch from "./components/MainComponents/NoMatch"
import Authorization from "./components/authorization"
import MainPageUser from "./components/User/MainPageUser"
import { ruRU } from '@material-ui/core/locale'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { Privacy } from './components/Help/privacy';
import { EULA } from './components/Help/eula';
import { getLocalStorage, setLocalStorage } from './Cookie';
import { strings } from './localization'
import RestorePasswordOwner from "./components/MainComponents/restorePasswordOwner"
import RestorePasswordUser from "./components/User/restorePasswordUser"


// Просто набросок, чтобы потом менять было удобнее. Тему удобно создавать с помощью вот этого: https://material.io/resources/color/#!/?view.left=0&view.right=0
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#a6a55c',
//       main: '#767630',
//       dark: '#484b02',
//       contrastText: fade('#ffffff', 0.85)
//     },
//     secondary: {
//       light: '#ffb851',
//       main: '#aa0d0a',
//       dark: '#b2741a',
//       contrastText: fade('#ffffff', 0.73)
//     },
//     background: {
//       default: '#e1e2e1',

//     },
//     text: {
//       primary: fade('#000000', 0.55),
//       secondary: fade('#000000', 0.55),
//       hint: fade('#000000', 0.55)
//     }
//   }
// })

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffb851',
      main: '#aa0d0a',
      dark: '#b2741a',
      contrastText: fade('#ffffff', 0.73)
    },
    secondary: {
      light: '#a6a55c',
      main: '#767630',
      dark: '#484b02',
      contrastText: fade('#ffffff', 0.85)
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
}, ruRU)

function App() {
  if (getLocalStorage("lang") === undefined) {
    setLocalStorage("lang", 'en');
  } else {
    strings.setLanguage(getLocalStorage("lang"));
    console.log(getLocalStorage("lang"));
  }

  const [loading, setLoading] = useState(true);

  const auth = (prop) => {
    setLoading(prop);
  }

  // useEffect(() => {
  //   // changeLanguage();
  // });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={4}>
          <Switch>
            <Route exact path="/">
              {/* <Redirect to="/groups" /> */}
              <Authorization auth={() => auth()} />
            </Route>
            <Route exact path="/user/">
              <Redirect to="/user/group" />
            </Route>
            {/* <Route exact path="/" component={MainPageAdmin} /> */}
            <Route exact path="/:id">
              <MainPageAdmin loading={loading} />
            </Route>
            <Route exact path="/user/:id">
              <MainPageUser />
            </Route>
            <Route exact path="/user/quest/:id">
              <MainPageUser />
            </Route>
            <Route exact path="/docs/privacy" component={Privacy} />
            <Route exact path="/docs/eula" component={EULA} />
            <Route exact path="/login/user" component={LoginUser} />
            <Route path="/login/owner" component={SignIn} />
            <Route path="/signup/owner" component={SignUp} />
            <Route exact path="/owner/restore-password" component={RestorePasswordOwner} />
            <Route exact path="/participant/restore-password" component={RestorePasswordUser} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
