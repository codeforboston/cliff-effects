import React, { Component } from 'react';
import {
  // Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Icon,
  Form
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import FixedMenu from './fixedMenu';
import logo from './logo.png';

class ClientIntakePage extends Component {

  state = {
    redirect: false,
    name: '',
    lastVisit: '',
    clientId: '',
    image: 'http://react.semantic-ui.com/assets/images/avatar/large/jenny.jpg',
    dob: '',
    zipCode: '',
    visits: [],  
  };

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value })

  handleFormSubmit = e => {
    // alert('Placeholder. Will save the client and take you to the client detail page')
    this.setState({redirect:true});
    // Take the current state and create a new client in the database
  }

  render() {
    const { visible } = this.state

    return (
      <div>
        { visible ? <FixedMenu /> : null }
        {this.state.redirect ? (<Redirect to='/detail/54321'/>) : false}

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ padding: '1em 0em' }}
            vertical
            color='teal'
          >
            <Container>
              <Menu inverted secondary size='large'>
                <Menu.Item>
                  <Link to="/"><Image src={logo} size='tiny' /></Link>
                </Menu.Item>
                <Menu.Item><Link to="/">Home</Link></Menu.Item>
                <Menu.Item><Link to="/about">About</Link></Menu.Item>
                <Menu.Item active><Link to="/intake">New Client Intake</Link></Menu.Item>
                <Menu.Item position='right'>
                  {/*<Link to="/login"><Button inverted>Log in</Button></Link>*/}
                  {/*<Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>*/}
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '4em 0em' }} vertical>
          <Header as='h1' style={{ fontSize: '4em', padding: '1em 1em' }}>New Client Intake</Header>
          <Grid container stackable verticalAlign='middle'>         
            <Grid.Row>            
              <Grid.Column width={4}>
                <Image src={this.state.image} size='medium'/>
              </Grid.Column>
              <Grid.Column floated='right' width={12}>
                <Form onSubmit={this.handleFormSubmit}>
                  <Form.Input label='Name' placeholder='First name and last initial' name='name' value={this.state.name} onChange={this.handleInputChange} />
                  <Form.Input label='Date of Birth' placeholder='Date of Birth' name='dob' value={this.state.dob} onChange={this.handleInputChange}  />
                  <Form.Input label='Zip Code' placeholder='Zip Code' name='zipCode' value={this.state.zipCode} onChange={this.handleInputChange}  />
                  <Form.Input label='Client Avatar URL' placeholder='Avatar URL' name='image' value={this.state.image} onChange={this.handleInputChange}  />
                  <Form.Button color='teal'>Submit</Form.Button>
                </Form>          
              </Grid.Column>
            </Grid.Row>
            <Divider/>
          </Grid>
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

export default ClientIntakePage;