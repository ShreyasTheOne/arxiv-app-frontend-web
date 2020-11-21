import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Login from './login/login'
import OnLogin from './login/onLogin'
import Home from './home/home'

class App extends Component {

    render() {
        console.log("apps", this.props)
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
                        path={`${match.path}`}
                        component={Home}
                    />
                </Switch>
            </Router>
        )
    }
}

export default App;
