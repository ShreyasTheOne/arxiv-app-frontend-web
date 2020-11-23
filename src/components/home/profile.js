import React, { Component } from 'react'
import { Header, Card, Icon, Label, Container } from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'
import axios from 'axios'
import { Router, Switch } from 'react-router-dom'
import './css/profile.css'
import './css/papers.css'
import { apiBlogVoteUrl, apiBookmarkUrl } from '../../urls'

class Profile extends Component {

    constructor (props) {
        super(props)
        const { bookmarks, blogs } = this.props.user
        let l = bookmarks.length
        let bookmark_ids = []
        for (let i=0; i<l; i++) {
            bookmark_ids.push(bookmarks[i].arxiv_id)
        }
        this.state = {
            user: this.props.user,
            error: false,
            bookmark_loading: 'lolism',
            bookmarks,
            blogs,
            bookmark_ids
        }
    }

    bookmark (action, id) {
        if (action == 'add') return
        
        this.setState({
            bookmark_loading: id,
        })
        axios({
            method: 'POST',
            url: apiBookmarkUrl(),
            data: {
                'action': action,
                'arxiv_id': id
            },
            withCredentials: true,
        }).then( res => {
            let arr = this.state.bookmarks
            let carr = this.state.bookmark_ids
            let there_be_light
            for (let i=0; i<arr.length; i++) {
                if (arr[i].arxiv_id == id) {
                    there_be_light = i
                    break;
                }
            }
            const darkness = carr.indexOf(id)
            carr.splice(darkness, 1)
            arr.splice(there_be_light, 1)

            this.setState({
                bookmark_ids: carr,
                bookmarks: arr,
                bookmark_loading: 'lolism'
            })
            
        }).catch( e => {
            this.setState({
                bookmark_loading: 'lolism',
            })
            console.log(e)
        })
    }

    handleVote = (action, id, index) => {

        axios({
            method: 'GET',
            url: apiBlogVoteUrl(id),
            params: {
                vote: action,
            }
        }).then(res => {
            let x = this.state.blogs
            if(action == 'up'){
                x[index].votes++;
            }else{
                x[index].votes--;
            }
            this.setState({blogs: x})
        }).catch(e => {
            console.log(e)
        })

    }

    render() {

        const papers = this.state.user.bookmarks
        const blogs = this.state.blogs

        return (
            <div className={'gaajar'}>
                <div className={'gobhi'}>
                    <div className='results-header'>
                        <Header size='large' className='show-results-for'>
                            Your bookmarks:
                        </Header>
                    </div> 
                    <Scrollbars 
                        autohide='true' 
                        noScrollX={true} 
                        className='tall'
                        style={{
                            height: 1000,
                        }}
                    >
                        
                        <div className='search-results'>
                            <Card.Group>
                                {
                                    papers.map((paper, index) => {
                                        return (
                                            <Card
                                                raised
                                                href={''}
                                                key={index}
                                                style={{
                                                    padding: '0px',
                                                    borderLeftWidth: "3px",
                                                    borderLeftStyle: "solid",
                                                    borderLeftColor: 'red',
                                                }}
                                                fluid
                                            >
                                                <Card.Content className='content'>
                                                    <Card.Header>
                                                        {paper.title}
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        {paper.authors.split('&#&').join(', ')}
                                                    </Card.Meta>
                                                    
                                                </Card.Content>
                                                <Container className='summary'>
                                                    <Card.Description>
                                                        {paper.summary}
                                                    </Card.Description>
                                                </Container>
                                                <Container className='paper-actions'>
                                                    {
                                                        this.state.bookmark_ids.includes(paper.arxiv_id) ? 
                                                        <Icon
                                                            loading={this.state.bookmark_loading==paper.arxiv_id}
                                                            style={{cursor:'pointer'}}
                                                            onClick={() => {this.bookmark('remove', paper.arxiv_id)}} 
                                                            name='star'
                                                        />
                                                        :
                                                        <Icon
                                                            loading={this.state.bookmark_loading==paper.arxiv_id}
                                                            style={{cursor:'pointer'}}
                                                            onClick={() => {this.bookmark('add', paper.arxiv_id)}} 
                                                            name='star outline'
                                                        />
                                                    }
                                                    <Label 
                                                        color='red' 
                                                        style={{marginLeft: '8px', cursor: 'pointer'}}
                                                        onClick={ () => {window.location = paper.html_url} }
                                                        >
                                                        View on Arxiv
                                                    </Label>
                                                    <Label 
                                                        color='blue' 
                                                        style={{marginLeft: '10px', cursor: 'pointer'}}
                                                        onClick={ () => {window.location = paper.pdf_url} }
                                                        >
                                                        View PDF
                                                    </Label>
                                                </Container>
                                            </Card>
                                        )
                                    })
                                }
                            </Card.Group>
                        </div>
                    </Scrollbars>
                </div>
                <div className={'adrak'}>
                    <div className='results-header'>
                        <Header size='large' className='show-results-for'>
                            Blogs authored by you:
                        </Header>
                    </div>
                    <Scrollbars
                        autoHide='true' 
                        noScrollX={true} 
                        className='tall' 
                        style={{
                            height: 1000,
                        }}
                    >
                        <div className='search-results'>
                            <Card.Group>
                                {
                                    blogs.map((blog, index) => {
                                        return (
                                            <Card 
                                                raised 
                                                href={''}
                                                key={index}
                                                style={{
                                                    padding: '0px',
                                                    borderLeftWidth: '3px',
                                                    borderLeftStyle: 'solid',
                                                    borderLeftColor: 'blue',
                                                }} 
                                                fluid
                                            >
                                                <Card.Content className='content'>
                                                    <Card.Header>
                                                        {blog.title}
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        {blog.author.username}
                                                    </Card.Meta>
                                                </Card.Content>
                                                <Container className='summary'>
                                                    <Card.Description>
                                                        {blog.body}
                                                    </Card.Description>
                                                </Container>
                                                <Container className='paper-actions'>
                                                    
                                                    <Icon 
                                                        style={{cursor: 'pointer'}} 
                                                        onClick={() => {this.handleVote('up', blog.id, index)}} 
                                                        name='thumbs up outline'
                                                    />
                                                    <Label>{blog.votes}</Label>&nbsp;&nbsp;
                                                    <Icon 
                                                        style={{cursor: 'pointer'}} 
                                                        onClick={() => {this.handleVote('down', blog.id, index)}} 
                                                        name='thumbs down outline'
                                                    />
                                                </Container>
                                            </Card>
                                        )
                                    })
                                }
                            </Card.Group>
                        </div>
                    </Scrollbars>
                </div>
            </div>

        )
    }
}

export default Profile;
