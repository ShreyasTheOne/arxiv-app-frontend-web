import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './components/app'
import * as serviceWorker from './serviceWorker'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = 'arxivapp_csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <Route path='/' component={App} />
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
