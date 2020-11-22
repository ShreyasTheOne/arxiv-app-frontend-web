import React, { Component } from 'react'
import {
    Header,
    Loader,
    Menu,
    Image,
    Popup,
    Button,
    Icon
} from 'semantic-ui-react'
import { 
    apiAuthVerifyUrl, 
    appHomeUrl,
    apiAuthLogoutUrl
} from '../../urls'
import axios from 'axios'
import './css/home.css'
import { Link, Redirect } from 'react-router-dom'
import Papers from './papers'
import Forum from './forum'
import Profile from './profile'


class Home extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            user: null,
            activeItem: 'papers'
        }
    }

    componentDidMount() {
        axios({
            url: apiAuthVerifyUrl(),
            method: 'get',
        }).then(res => {
            const {login_status, user} = res.data
            if (login_status) {
                this.setState({
                    user: user,
                    bookmarks: user.bookmarks,
                    downloads: user.downloads,
                })
            } else {
                this.setState({
                    user: {
                        'id': -1
                    }
                })
            }
        }).catch(e => {
            this.setState({
                user: {
                    'id': -1
                }
            })
        })
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name
        })
    }

    logout() {
        axios({
            url: apiAuthLogoutUrl(),
            method: 'post',
        }).then(res => {
            window.location = appHomeUrl()
        }).catch(e => {
            window.location = appHomeUrl()
        })
    }

    render() {

        const { activeItem, user } = this.state

        if (user == null) {
            return (
                <div className='parent'>
                    <Loader active />
                </div>
            )
        } else if (user.id === -1) {
            return (
                <Redirect to='/login' />
            )
        }

        return (
            <div className='parent'>

                <div className='nav'>
                    <div className='menu-app-header'>
                        <Link to='/' className='a'>
                            <div className='ui huge header menu-app-header'>ArxivWeb</div>
                        </Link> 
                    </div>
                    <div id='nav-menu'>
                        <Menu color='red' pointing secondary compact>
                            <Menu.Item
                                name='papers'
                                active={activeItem === 'papers'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='forum'
                                active={activeItem === 'forum'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='profile'
                                active={activeItem === 'profile'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </div>
                    <div className='user-info'>
                        <div>
                            <Header size='large' className='user-info-header'>
                                Hey, {user.username}!
                        </Header>
                        </div>
                        <div>
                            <Popup
                                hideOnScroll
                                position='bottom right'
                                on="click"
                                style={{ padding: "0px" }}
                                trigger={
                                    <Image
                                        style={{ cursor: 'pointer' }}
                                        src={user.profile_picture}
                                        avatar
                                        size='mini'
                                    />
                                }
                            >
                                <Button
                                    color='red'
                                    size='large'
                                    fluid
                                    onClick={this.logout}
                                >
                                    <Icon name='log out' />
                                    Logout
                                </Button>
                            </Popup>

                        </div>
                    </div>
                </div>
                <div className='nav-mobile'>
                    <Link to='/' className='menu-app-header'>
                    <div className='ui large header menu-app-header'>ArxivWeb</div>
                    </Link> 
                    <Popup
                        hideOnScroll
                        position='bottom right'
                        on="click"
                        style={{ padding: "0px" }}
                        trigger={
                            <Image
                                style={{ cursor: 'pointer' }}
                                src={user.profile_picture}
                                avatar
                                size='mini'
                            />
                        }
                    >
                        <Button
                            color='red'
                            size='large'
                            fluid
                            onClick={this.logout}
                        >
                            <Icon name='log out' />
                            Logout
                        </Button>
                    </Popup>
                </div>
                <div id='nav-menu-mobile'>
                    <Menu color='red' compact secondary>
                        <Menu.Item
                            name='papers'
                            active={activeItem === 'papers'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='forum'
                            active={activeItem === 'forum'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='profile'
                            active={activeItem === 'profile'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                </div>

                {activeItem == 'papers' && <Papers user={user}/>}
                {activeItem == 'forum' && <Forum user={user}/>}
                {activeItem == 'profile' && <Profile user={user}/>}

            </div>
        )
    }
}

export default Home;
