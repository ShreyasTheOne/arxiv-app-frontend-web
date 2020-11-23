import React, { Component } from 'react'
import { TextArea, Form, Button, Input, Header, Icon, Pagination, Card, Container, Divider, Label } from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'
import axios from 'axios'
import { apiBlogDetailUrl, apiBlogUrl, apiBlogVoteUrl } from '../../urls'
import './css/papers.css'
import './css/forum.css'

class Forum extends Component {

    constructor (props) {
        super(props)
        this.regSearchRef = React.createRef()

        this.state = {searchBarText: "", 
            searching: false, 
            blogs: [], 
            zero_results: true,
            searchKeyword: "",
            createBlogTitle: "",
            createBlogBody: "",
            blogCreated: false,
        }
    }

    componentDidMount () {
        this.regSearchRef.current.focus()
    }

    handleFieldUpdate = (stateVariable, data) => {
        this.setState({[stateVariable]: data})
    }

    onPageChange = (event, data) => {
        const activePage = data
        const blogCount = this.state.blogs.length
        const blogs = this.state.blogs
        const blogStart = (activePage-1)*10
        const blogEnd = blogStart+10 < blogCount ? blogStart+10 : blogStart

        let displayedBlogs = blogs.slice(blogStart, blogEnd)

        this.setState({displayedBlogs: displayedBlogs})
    }

    handleSearch(){

        if(this.state.searchBarText === ""){
            alert("Please type something to search...")
        }else{
            this.setState({searching: true})
            axios({
                method: 'GET',
                url: apiBlogUrl(),
                params: {
                    search: this.state.searchBarText,
                },
                withCredentials: true,
            }).then(res => {

                const blogStart = 0
                const blogEnd = res.data.length > 10 ? 10 : res.data.length

                this.setState({
                    searching: false,
                    createBlog: false, 
                    blogs: res.data, 
                    zero_results: false,
                    searchKeyword: this.state.searchBarText,
                    totalPages: Math.floor(res.data.length / 10) + (res.data.length%10 ? 1:0),
                    displayedBlogs: res.data.slice(blogStart, blogEnd)
                })
            }).catch(e => {
                console.log(e)
                this.setState({searching: false})
            })
        }

    }

    handleCreate(){

        axios({
            method: 'POST',
            url: apiBlogUrl(),
            data: {
                'title': this.state.createBlogTitle,
                'body': this.state.createBlogBody,
            },
            withCredentials: true,
        }).then(res => {
            
            this.setState({
                blogCreated: true,
                blogCreatedTitle: res.data.title,
                blogCreatedBody: res.data.body,
            })

        }).catch(e => {
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
        return (
            <div className='container'>
                <div className='left'>
                    <Scrollbars
                        autoHide='true' 
                        noScrollX={true} 
                        className='tall' 
                        style={{
                            height: 1000,
                        }}
                    >
                        <Header size='huge' className='search'>
                            Search
                        </Header>
                        <span> 
                            <Input
                                ref={this.regSearchRef}
                                className='input'
                                fluid
                                placeholder='Title...'
                                action={{
                                    color: 'red',
                                    content: 'Search',
                                    onClick: this.handleSearch.bind(this),
                                    loading: this.state.searching,
                                    disabled: this.state.searching
                                }}
                                onChange = { (event, data) => {
                                    this.handleFieldUpdate("searchBarText", data.value)
                                }}
                            />
                        </span>
                        <div style={{marginTop: '7vh'}} />
                        <Header size='huge' className='search'>
                            Create Your Own Blog
                        </Header>
                        <Form>
                            <Form.Input 
                                fulid 
                                label={"Title"} 
                                placeholder={'Title for your blog'} 
                                onChange = {(event, data) => {
                                    this.handleFieldUpdate("createBlogTitle", data.value)
                                }} 
                            />
                            <Form.TextArea 
                                label={"Body"} 
                                placeholder={"Type something here..."} 
                                onChange = {(event, data) => {
                                    this.handleFieldUpdate("createBlogBody", data.value)
                                }}
                            />
                            <Form.Button
                                color="red" 
                                onClick={this.handleCreate.bind(this)} 
                            >Create</Form.Button>
                        </Form>
                    </Scrollbars>
                </div>
                <div className='right'>
                    {
                        this.state.blogs.length == 0 && this.state.zero_results && !this.state.blogCreated &&

                        <div className='search-message'>
                            <Header icon>
                                <Icon color='red' name='search' />
                                Search something to fetch blogs!
                            </Header>
                        </div>

                    }

                    {
                        this.state.blogs.length == 0 && !this.state.zero_results && !this.state.blogCreated &&

                        <div className='search-message'>
                            <Header icon>
                                <Icon name='frown outline' />
                                Sorry, no blogs match your keywords...
                            </Header>
                        </div>

                    }

                    {
                        this.state.blogCreated && 

                        <span>
                        <div className='results-header'>
                            <Header size='large' className='show-results-for'>
                                Blog Created Successfully!
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
                                    <Card 
                                        raised 
                                        href={''}
                                        key={0}
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
                                                {this.state.blogCreatedTitle}
                                            </Card.Header>
                                        </Card.Content>
                                        <Container className='summary'>
                                            <Card.Description>
                                                {this.state.blogCreatedBody}
                                            </Card.Description>
                                        </Container>
                                    </Card>
                                </Card.Group>
                            </div>
                        </Scrollbars>
                    </span>

                    }

                    {
                        this.state.blogs.length > 0 && 
                            <span>
                                <div className='results-header'>
                                    <Header size='large' className='show-results-for'>
                                        Results matching: {this.state.searchKeyword}
                                    </Header>
                                    <Pagination 
                                        totalPages={this.state.totalPages}
                                        defaultActivePage={1}
                                        onPageChange={this.onPageChange}
                                    />
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
                                                this.state.displayedBlogs.map((blog, index) => {
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
                            </span>
                    }
                </div>
            </div>

        )
    }
}

export default Forum;
