/* This is used to determine if a user is authenticated and
if they are allowed to visit the page they navigated to.

If they are: they proceed to the page
If not: they are redirected to the login page. */
import React, {Component} from 'react'

import  * as auth from './UserAuth'
import { Redirect, Route } from 'react-router-dom'

import { apiGet, apiPost } from './APIRequests'
import {sleep, refreshLoggedInUser } from './common'

// var isLoggedIn = false
// const isUserLoggedIn = async () => {
//   await auth.isLoggedIn().then(e => {
//     isLoggedIn = e
//   })
// }
// const PrivateRoute = ({ component: Component, ...rest }) => {

//  /*  Add your own authentication on the below line. */
// //  console.log(`auth.isLoggedIn()`, auth.isLoggedIn())
//    const isLoggedIn = auth.isLoggedIn()
//   // var isLoggedIn = false
//   // auth.isLoggedIn().then(e => {
//   //   isLoggedIn = e
    
//   // })
//  // isUserLoggedIn()
 
  


//   /* enhancing user logout/login experience */
//   // if(isLoggedIn ) {
//   //   localStorage.setItem('lastVisitedPage', window.location.pathname)
//   // }
 
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isLoggedIn ?  <Component {...props} />  :  <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> 
//       }
//     />
//   )
// }

class PrivateRoute extends Component {

  constructor(props){
    super(props)
    refreshLoggedInUser()
    
  }

  render(){
    const { component: Component, ...rest } = this.props;
    const isLoggedIn = auth.isLoggedIn() 
  
     
    // console.log(`isLoggedIn`, isLoggedIn)
    return(
      <Route
        {...rest}
        render={props => {
          return isLoggedIn ? (
            <Component {...props} />
          ): (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }}
        />
    )
  }

}

export default PrivateRoute

