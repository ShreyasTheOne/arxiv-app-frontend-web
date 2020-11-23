import React, {Component} from 'react';
import axios from 'axios';
import { apiAuthLoginUrl, appHomeUrl, appTopicsUrl } from '../../urls'
import { getCookie } from '../../utils'

let headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': getCookie('arxivapp_csrftoken')
}

class OnLogin extends Component { 
  
  callbackFunction = (code) => {
    console.log(code)
    const data = {
      'code': code,
    }
    axios({
      url: apiAuthLoginUrl(),
      method: 'post',
      headers: headers,
      withCredentials: true,
      data: data,
    }).then( res => {
      console.log(res)
      window.location = appHomeUrl()
    }).catch( e => {
      window.location = appHomeUrl()
    })
  }

  componentDidMount() {
    let params = new URLSearchParams(window.location.search)
    if (params.get('state') == headers['X-CSRFToken']) {
        this.callbackFunction(params.get('code'))        
    } else {
        window.location = appHomeUrl()
    }
  }

  render(){
    return(
      <div/>
    )
  }
}
 export default OnLogin;