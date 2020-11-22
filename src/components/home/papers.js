import React, { Component } from 'react'
import { apiSearchUrl, apiBookmarkUrl, apiDownloadUrl } from '../../urls'
import { Button, Header, Input, Icon, Segment, Card, Transition, Container, Label, Pagination } from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts'
import axios from 'axios'
import './css/papers.css'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link, Router, Switch } from 'react-router-dom'

const search_fields = [
    'ti', 'au', 'abs', 'co', 'cat', 'jr'
]

class Papers extends Component {

    constructor (props) {
        super(props)
        this.regSearchRef = React.createRef()

        const {bookmarks, downloads} = this.props.user
        let l = bookmarks.length
        let bookmark_ids = []
        for (let i=0; i<l; i++) {
            bookmark_ids.push(bookmarks[i].arxiv_id)
        }
        this.state = {
            advanced_search: false,
            searching: false,
            papers: [],
            zero_results: false,
            bookmark_loading: 'lolism',
            displayed_papers: [],   
            bookmark_ids
        }
    }

    componentDidMount () {
        this.regSearchRef.current.focus()
    }

    search () {
        let params = {}
        let empty = true
        for (let i=0; i<6; i++) {
            let key = search_fields[i]
            if (this.state[key] != null && this.state[key] != "") {
                params[key] = this.state[key]
                empty = false
            }
        }

        if (empty) {
            alert('Please type something to search...')
            return
        }

        this.setState({
            searching: true,
        })

        axios({
            method: 'GET',
            url: apiSearchUrl(),
            params: { ...params },
            withCredentials: true,
        }).then( res => {
            const paper_count = res.data.papers.length
            const total_pages = Math.floor(paper_count / 10) + (paper_count % 10 ? 1:0)
            const active_page = 1
            const paper_start = (active_page-1)*10
            const paper_end = (paper_start)+10 < paper_count ? paper_start + 10 : paper_count
            const displayed_papers = res.data.papers.slice(paper_start, paper_end)
            this.setState({
                papers: res.data.papers,
                searching: false,
                zero_results: res.data.papers.length == 0,
                paper_count: paper_count,
                total_pages: total_pages,
                active_page: active_page,
                displayed_papers
            })
        }).catch(e => {
            this.setState({
                papers: [],
                zero_results: false,
                searching: false,
            })
            toast({
                type: 'error',
                title: 'Error',
                description: 'Error while fetching papers',
                time: 3000
            })
        })
    }  

    bookmark (action, id) {
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
            let arr;
            if (action == 'add') {
                arr = this.state.bookmark_ids
                arr.push(id)
            } else {
                arr = this.state.bookmark_ids
                const ind = arr.indexOf(id)
                arr.splice(ind, 1)
            }

            this.setState({
                bookmark_ids: arr,
                bookmark_loading: 'lolism'
            })
            
        }).catch( e => {
            this.setState({
                bookmark_loading: 'lolism',
            })
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

    onPageChange = (event, data) => {
        const { activePage } = data
        const { paper_count, papers } = this.state
        const paper_start = (activePage-1)*10
        const paper_end = (paper_start)+10 < paper_count ? paper_start + 10 : paper_count
        let displayed_papers = papers.slice(paper_start, paper_end)
        console.log("dp", papers)
        console.log("pe", paper_end)
        console.log("ps", paper_start)
        console.log("ap", activePage)
        
        this.setState({displayed_papers})
    }

    onInputChange (field, value) {
        this.setState({
            [field]: value
        })
    }

    toggleAdvanced (action) {
        this.setState({
            advanced_search: action == 'enable',
        })
    }

    render() {
        const { 
            advanced_search, 
            searching,
            zero_results
        } = this.state
        const papers = this.state.displayed_papers
        return (
            <div className='container'>
                <div className='left'>
                    <Header size='huge' className='search'>
                        Search
                    </Header>  
                        
                    {!advanced_search 
                        &&
                        <span> 
                            <Input
                                ref={this.regSearchRef}
                                className='input'
                                fluid
                                placeholder='Title...'
                                action={{
                                    color: 'red',
                                    content: 'Search',
                                    onClick: this.search.bind(this),
                                    loading: searching,
                                    disabled: searching
                                }}
                                onChange = { (event, data) => {
                                    this.onInputChange('ti', data.value)
                                }}
                            />
                            <u
                                id='advSrch'
                                onClick={() => this.toggleAdvanced('enable')}
                            >
                                Advanced Search
                            </u>
                        </span>
                    }

                    {advanced_search &&
                        <span>
                            <u
                                id='advSrch'
                                onClick={() => this.toggleAdvanced('disable')}
                            >
                                Hide Advanced Search
                            </u>

                            <Input
                                ref={this.regSearchRef}
                                className='input'
                                fluid
                                placeholder='Title...'
                                onChange = { (event, data) => {
                                    this.onInputChange('ti', data.value)
                                }}
                            />

                            <Input
                                className='input'
                                fluid
                                placeholder='Author...'
                                onChange = { (event, data) => {
                                    this.onInputChange('au', data.value)
                                }}
                            />

                            <Input
                                className='input'
                                fluid
                                placeholder='Abstract...'
                                onChange = { (event, data) => {
                                    this.onInputChange('abs', data.value)
                                }}
                            />

                            <Button 
                                loading={searching}
                                disabled={searching}
                                inverted 
                                color='red'
                                onClick={this.search.bind(this)}
                            >
                                    Search
                            </Button>
                        </span>
                    }
                </div>
                <div className='right'>
                    {
                        papers.length == 0 && zero_results == false &&

                        <div className='search-message'>
                            <Header icon>
                                <Icon color='red' name='search' />
                                Search something to fetch papers!
                            </Header>
                        </div>

                    }

                    {
                        papers.length == 0 && zero_results == true &&

                        <div className='search-message'>
                            <Header icon>
                                <Icon name='frown outline' />
                                Sorry, no papers match your keywords...
                            </Header>
                        </div>

                    }
                    
                    {
                        papers.length > 0 && 
                            <span>
                                <div className='results-header'>
                                    <Header size='large' className='show-results-for'>
                                        Results matching: {this.state.ti}
                                    </Header>
                                    <Pagination
                                        totalPages={this.state.total_pages}
                                        defaultActivePage={1}
                                        onPageChange={this.onPageChange}
                                    />
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
                            </span>
                    }

                </div>

                
                
            </div>

        )
    }
}

export default Papers;


                        