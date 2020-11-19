import React, { Component } from 'react'
import { TextArea, Form, Button, Input } from 'semantic-ui-react'
import axios from 'axios'
import { apiBlogDetailUrl, apiBlogUrl, apiBlogVoteUrl } from '../../urls'

class Forum extends Component {

    constructor (props) {
        super(props)
        this.state = {}
    }

    componentDidMount () {
        axios({
            method: 'GET',
            url: apiBlogUrl(),
        }).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }

    createBlog () {
        const {blogTitle, blogContent} = this.state
        console.log(blogTitle, blogContent)
        axios({
            method: 'POST',
            data: {
                'title': blogTitle,
                'body': blogContent,
            },
            url: apiBlogUrl(),
        }).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }

    updateBlog () {
        const {blogTitle, blogContent} = this.state
        axios({
            method: 'PUT',
            data: {
                'title': blogTitle,
                'body': blogContent,
            },
            url: apiBlogDetailUrl(2)
        }).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }

    vote (index, direction) {
        axios({
            method: 'GET',
            params: {
                'vote': direction,
            },
            url: apiBlogVoteUrl(index),
        }).then(res => {
            console.log(res)
        })
    }

    render() {
        const { match } = this.props
        return (
            <div >
                <Input 
                    placeholder='Blog title...'
                    onChange = { (event, data) => {
                        this.setState({
                            blogTitle: data.value,
                        })
                    }}
                /> 
                <Form>
                    <TextArea
                        placeholder='Write blog content'
                        onChange = { (event, data) => {
                            this.setState({
                                blogContent: data.value,
                            })
                        }}
                    />
                </Form>
                <Button
                    onClick={this.createBlog.bind(this)}
                >
                    Create blog
                </Button>
                <Button
                    onClick={this.updateBlog.bind(this)}
                >
                    Update blog
                </Button>
                <Button
                    onClick={() => {this.vote(2, 'up')}}
                >
                    Upvote
                </Button>
                <Button
                    onClick={() => {this.vote(2, 'down')}}
                >
                    Downvote
                </Button>
            </div>

        )
    }
}

export default Forum;
