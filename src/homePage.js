import React, { Component } from 'react'
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Card,
  Search
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FixedMenu from './fixedMenu';
import logo from './logo.png';
import { clientList } from './clientList';


class SearchExistingClients extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: clientList, value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      // const isMatch = (result) => true

      this.setState({
        isLoading: false,
        results: clientList.filter(client => (client.id == value) || (client.name.toLowerCase() == value.toLowerCase()))
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Segment>
        <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              /*results={results}*/
              value={value}
              /*{...this.props}*/
            />
        <Card.Group itemsPerRow={6} style={{ padding: '3em 3em' }}>
          {this.state.results.map(client =>
            (<Link to={'/detail/' + client.id} key={client.id}>
              <Card style={{ margin: '.5em .5em .5em .5em' }}
                image={client.image}
                header={client.name}
                meta={'Last Visit: ' + client.lastVisit}
                description= {client.id}
              />
            </Link>)
          )}             
        </Card.Group>
      </Segment>
    )
  }
}


class HomePage extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })

  render() {
    const { visible } = this.state

    return (
      <div>
        { visible ? <FixedMenu /> : null }

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 500, padding: '1em 0em' }}
            vertical
            color='teal'
          >
            <Container>
              <Menu inverted secondary size='large'>
                <Menu.Item>
                  <Link to="/"><Image src={logo} size='tiny' /></Link>
                </Menu.Item>
                <Menu.Item active><Link to="/">Home</Link></Menu.Item>
                <Menu.Item><Link to="/about">About</Link></Menu.Item>
                <Menu.Item><Link to="/intake">New Client Intake</Link></Menu.Item>
                <Menu.Item position='right'>
                  <Link to="/login"><Button inverted>Log in</Button></Link>
                  {/*<Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>*/}
                </Menu.Item>
              </Menu>
            </Container>

            <Container text>
            <br/>
              <Image src={logo} size='small' inline />
              <Header
                as='h1'
                content='Cliff Effects Tool'
                inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
              />
              <Header
                as='h2'
                content='Intake a new client or select an existing client to begin.'
                inverted
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
              />             
              <Link to="/intake"><Button size='big'>Intake New Client<Icon name='right arrow' /></Button></Link>             
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '8em 0em' }} vertical textAlign='center'>
          <Header as='h1' style={{ fontSize: '2em' }}>Existing Clients</Header>
          <SearchExistingClients />
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }} color='teal'>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Sitemap</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>Choice 1</List.Item>
                    <List.Item as='a'>Choice 2</List.Item>
                    <List.Item as='a'>Choice 3</List.Item>
                    <List.Item as='a'>Choice 4</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>Cliff Effects Tool</Header>
                  <p>Made with <Icon name='heart' size='small' /> by Code for Boston</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}

export default HomePage;