import React, { Component } from 'react'
import Nav from '../nav/nav'
import { Header, Menu } from 'semantic-ui-react'
import axios from 'axios'
import css from './home.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Topics from './topics'
import Forum from './forum'
import Profile from './profile'

class Home extends Component {

    render() {
        console.log("this.props")
        console.log(this.props)
        const { match } = this.props

        return (
            <div className='parent'>
                <Nav/>
                <Switch>
                    <Route exact path={`${match.path}`} component={Forum} />
                    <Route exact path={`${match.path[1]}`} component={Forum} />
                    <Route exact path={`${match.path[2]}`} component={Profile} />
                </Switch>
            </div>
        )
    }
}

export default Home;
