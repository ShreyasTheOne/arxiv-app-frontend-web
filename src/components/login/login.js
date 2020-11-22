import React, {Component} from 'react'
import { Container, Button, Header, Icon, Segment, Grid, Loader, Placeholder} from 'semantic-ui-react'
import { apiAuthVerifyUrl, googleRedirect }  from '../../urls'
import axios from 'axios'
import { getCookie } from '../../utils'
import './css/login.css'
import { Redirect } from 'react-router-dom'

let headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': getCookie('arxivapp_csrftoken')
}

class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      login_status: null,
    }
  }

  componentDidMount () {
    this.verify()
  }

  verify () {
    axios({
      url: apiAuthVerifyUrl(),
      method: 'get',
    }).then( res => {
      console.log(res)
      const login_status = res.data['login_status']
      this.setState({ login_status })
    }).catch( e => {
      console.log(e)
    })
  }

  redirect () {
    const authorization_endpoint = googleRedirect(headers['X-CSRFToken'])
    window.location = authorization_endpoint
  }

  render(){
    const { login_status } = this.state

    if (login_status === null) {
      return (
        <Loader active/>
      )
    } else if (login_status) {
      return (
        <Redirect to='/'/>
      )
    } else {
      return (
        <div className={'parent'}>
          <Container>
            <div className={'main'}>
              <Header color='red' textAlign='center'>
                Arxiv-Web
              </Header>

              <div className={'paragraph'}>
                <Container text fluid>
                  <Header as='h1'>
                    LOLISM
                  </Header>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                    ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                    magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                    quis enim.
                  </p>
                </Container>
              </div>

              <div className={'content'}>
                <Grid columns={2} stackable textAlign='left' >
                  <Grid.Row verticalAlign='middle' stretched>
                    <Grid.Column stretched id={'col1'}>
                      <div className={'buttons'}>
                        <Button
                          color='blue'
                          size='large'
                          fluid
                          onClick={this.redirect}
                        >
                          <Icon name='google'/>
                          Sign in with Google
                        </Button>

                        <Button
                          secondary
                          fluid
                          size='large'
                          onClick={this.redirect}
                        >
                          <Icon name='google play'/>
                          Download the Android App
                        </Button>
                      </div>
                    </Grid.Column>
                    <Grid.Column>
                      <Segment raised>
                      <Placeholder>
                        <Placeholder.Header image>
                          <Placeholder.Line />
                          <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                          <Placeholder.Line />
                        </Placeholder.Paragraph>
                      </Placeholder>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </Container>
        </div>
      )
    }    
  }
}

export default Login;

