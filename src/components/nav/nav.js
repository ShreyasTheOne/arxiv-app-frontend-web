import React, { Component } from 'react'
import css from './nav.css'
import { Header } from 'semantic-ui-react'

class Nav extends Component {

  render () {

    return (
      <div className={'parent'}>
        <div className={'app_name'}>
          <Header color='red'>
            Arxiv-Web
          </Header>
        </div>
        
      </div>
    )
  }
}

export default Nav;
