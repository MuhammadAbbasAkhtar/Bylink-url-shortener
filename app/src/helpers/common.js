import {apiGet, apiPost} from './APIRequests'
import * as auth from './UserAuth'
export function changePageTitle(title) {
    document.title = `ByLink | ${title}`
}

export const sleep = ms => {
    const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}

export const refreshLoggedInUser = async () => {
  apiGet('/api/auth/validate-token', (res) => {
    if(!res.success)
      apiPost('/api/auth/refresh', null, (res)=> {
        if(res.success){
          auth.setToken(res.token)
        }
        //else console.log(res)
      })
    else { //console.log(res)
    }
  })
}