import React, { Component } from 'react'
import { apiSearchUrl, apiBookmarkUrl, apiDownloadUrl } from '../../urls'
import { Button, Header, Input, Form, TextArea } from 'semantic-ui-react'
import axios from 'axios'
import { Router, Switch } from 'react-router-dom'

const search_fields = [
    'ti', 'au', 'abs', 'co', 'cat', 'jr'
]

class Topics extends Component {

    constructor (props) {
        super(props)
        this.state = {}
    }

    search () {
        let params = {}
        for (let i=0; i<6; i++) {
            let key = search_fields[i]
            if (this.state[key] != null && this.state[key] != "") {
                params[key] = this.state[key]
            }
        }
        axios({
            method: 'GET',
            url: apiSearchUrl(),
            params: { ...params },
            withCredentials: true,
        }).then( res => {
            this.setState({
                papers: res.data.Results
            })
            console.log(res.data.Results)
        }).catch(e => {
            alert(e)
        })
    }  

    bookmark (action) {
        axios({
            method: 'POST',
            url: apiBookmarkUrl(),
            data: {
                'action': action,
                'arxiv_id': this.state.papers.arxiv_id[0]
            },
            withCredentials: true,
        }).then( res => {
            console.log(res)
        }).catch( e => {
            console.log(e)
        })
    }

    download (action) {
        axios({
            method: 'POST',
            url: apiDownloadUrl(),
            data: {
                'action': action,
                'arxiv_id': this.state.papers.arxiv_id[0],
                'download_url': 'file/location/on/local/device'
            },
        }).then( res => {
            console.log(res)
        }).catch( e => {
            console.log(e)
        })
    }

    

    onInputChange (field, value) {
        this.setState({
            [field]: value
        })
    }

    render() {
        return (
            <div>
                <Header>Hello</Header>
                <Input 
                    placeholder='Title...'
                    onChange = { (event, data) => {
                        this.onInputChange('ti', data.value)
                    }}
                    />
                <Input 
                    placeholder='Author...'
                    onChange = { (event, data) => {
                        this.onInputChange('au', data.value)
                    }}
                    />
                <Input 
                    placeholder='Abstract...'
                    onChange = { (event, data) => {
                        this.onInputChange('abs', data.value)
                    }}
                    />
                <Input 
                    placeholder='Category...'
                    onChange = { (event, data) => {
                        this.onInputChange('cat', data.value)
                    }}
                    />
                <Input 
                    placeholder='ID...'
                    onChange = { (event, data) => {
                        this.onInputChange('id', data.value)
                    }}
                    />
                <Button
                    onClick={() => {this.search()}}
                >
                    Submit
                </Button>
                <Button
                    onClick={() => {this.bookmark('add')}}
                >
                    Bookmark Add
                </Button>
                <Button
                    onClick={() => {this.bookmark('remove')}}
                >
                    Bookmark Remove
                </Button>
                <Button
                    onClick={() => {this.download('add')}}
                >
                    Download Add
                </Button>
                <Button
                    onClick={() => {this.download('remove')}}
                >
                    Download Remove
                </Button>

                
            </div>

        )
    }
}

export default Topics;
