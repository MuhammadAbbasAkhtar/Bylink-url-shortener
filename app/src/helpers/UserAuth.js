import { apiGet } from './APIRequests';

import pathLocations from '../data/pathLocations'

export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const setUser = (data) => {
  localStorage.setItem('user', JSON.stringify(data) )
};

export const getUser = () => {
if (localStorage.getItem('user') === null) {
    return {};
}
return JSON.parse(localStorage.getItem('user'));
};

export const validateToken = async () => {
  await apiGet('/auth/validate-token', response =>  window.localStorage.setItem('loginValidated',response),  error => logOut() )

}

export const isLoggedIn = async () => {
    const isTokenValid = validToken()
    // helper.sleep(2000);
    // console.log(`isTokenValid`, isTokenValid)
    if (getToken() === null) 
        return false;
    else if (getToken() === undefined) 
        return false;
    else if(!isTokenValid)
        return false
    else 
        return true;
    
};

export const validToken = async () => {
    var isValid = false
    // helper.sleep(1000)
    apiGet('/api/auth/validate-token',(res)=> {
        isValid = res.success
    }, (err) => {isValid = false})
    return isValid
  //  return apiGet('/api/auth/validate-token', res => {return res.success}, err => {return false})
  //  return axios
  //  .get('/api/auth/validate-token', {
  //      headers: getCommonHeaders()
  //  })
  //  .then(response => {
  //      return response.data
  //  })
  //  .catch(error => {         
      
  //  });
}
export const LoggedInRedirect = () => {
  // console.log(isLoggedIn());
  if(isLoggedIn()){
    const lastUrl = localStorage.getItem('lastVisitedPage')
    
    
    if(lastUrl && lastUrl !== null && lastUrl !== 'null'){
      // localStorage.removeItem('lastVisitedPage');
      // window.location.href = lastUrl;
      window.location.href = pathLocations.dashboard;
    }
    else{
      //window.location.href = '/dashboard/';
      // window.location.href = pathLocations.createNewBanner;
      window.location.href = pathLocations.dashboard;
    }

    return true
  }
  return false
}
export const logOut = () => {


  //enhancing user logout/login experience
    localStorage.removeItem('loginValidated')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    // localStorage.clear();
    localStorage.setItem('lastVisitedPage', window.location.href)
    
  window.location.href = pathLocations.login;
  
};

