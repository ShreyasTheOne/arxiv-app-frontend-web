import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Login from './login/login'
import OnLogin from './login/onLogin'
import Home from './home/home'
import { apiAuthVerifyUrl } from '../urls'

class App extends Component {

    render() {

        const { match } = this.props

        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path={`${match.path}`}
                        component={Login}
                    />
                    <Route
                        exact
                        path={`${match.path}redirect/`}
                        component={OnLogin}
                    />
                    <Route
                        exact
                        path={[
                            `${match.path}forum/`,
                            `${match.path}topics/`,
                            `${match.path}profile/`,
                        ]}
                        component={Home}
                    />
                </Switch>
            </Router>
        )
    }
}

export default App;
