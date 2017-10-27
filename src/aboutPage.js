import React, { Component } from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FixedMenu from './fixedMenu';
import logo from './logo.svg';

class AboutPage extends Component {
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
                <Menu.Item active><Link to="/about">About</Link></Menu.Item>
                <Menu.Item><Link to="/intake">New Client Intake</Link></Menu.Item>
                <Menu.Item position='right'>
                  <Link to="/login"><Button inverted>Log in</Button></Link>
                  {/*<Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>*/}
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>         
            <Grid.Row>            
              <Grid.Column width={10}>
                <Header as='h1' style={{ fontSize: '4em' }}>About the Cliff Effects Tool</Header>
                <p style={{ fontSize: '1.33em' }}>
                  Fill in about the tool here.
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
              </Grid.Column>
            </Grid.Row>
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

export default AboutPage;