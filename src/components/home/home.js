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
import Topics from './topics'
import Forum from './forum'
import Profile from './profile'


class Home extends Component {

    constructor(props) {
        super(props)
        const { pathname } = this.props.location
        const activeItem = pathname.split('/')[1]
        this.state = {
            user: null,
            activeItem
        }
    }

    componentDidMount() {
        axios({
            url: apiAuthVerifyUrl(),
            method: 'get',
        }).then(res => {
            const login_status = res.data.login_status
            if (login_status) {
                this.setState({
                    user: res.data.user
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
        console.log("this.props")
        console.log(this.props)

        const { activeItem, user } = this.state

        if (user == null) {
            return (
                <div className='parent'>
                    <Loader active />
                </div>
            )
        } else if (user.id === -1) {
            return (
                <Redirect to='/' />
            )
        }

        return (
            <div className='parent'>

                <div className='nav'>
                    <div className='menu-app-header'> {/* nav.css */}
                        <Link to='/' className='a'>
                            <div className='ui huge header menu-app-header'>ArxivWeb</div>
                        </Link> {/* nav.css */}
                    </div>
                    <div id='nav-menu'>
                        <Menu color='red' pointing secondary compact>
                            <Menu.Item
                                name='topics'
                                active={activeItem === 'topics'}
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

                {activeItem == 'topics' && <Topics/>}
                {activeItem == 'forum' && <Forum/>}
                {activeItem == 'profile' && <Profile/>}

            </div>
        )
    }
}

export default Home;
