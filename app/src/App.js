
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import pathLocations from './data/pathLocations'
import Landing from './components/Landing'
import Login from './components/Auth/SignIn'
import Signup from './components/Auth/SignUp'
import ForgotPassword from './components/Auth/ForgotPassword'
import VerifyEmail from './components/Auth/VerifyEmail'
import PrivateRoute from './helpers/PrivateRoute'
import { Dashboard,RedirectHandler } from "./containers"
import {refreshLoggedInUser} from './helpers/common'
function App() {
  const path = pathLocations
  refreshLoggedInUser()
  return(
    <Switch>  
      <Route component={Landing} exact path={path.root} />
      <Route component={Landing} exact path={path.root}/>
      <Route component={Login} exact path={path.login}/>
      <Route component={Signup} exact path={path.signup}/>
      <Route component={VerifyEmail} path={path.verifyEmail} />
      <Route component={ForgotPassword} exact path={path.forgotPassword}/>.
      <PrivateRoute component={Dashboard}  path={path.dashboard} exact/>
      <Route component={RedirectHandler} path={path.redirectPath} />
    </Switch>
  )
  
}

export default App;
