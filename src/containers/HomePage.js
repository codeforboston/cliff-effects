import React, { Component } from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { MainMenu } from '../MainMenu';
import FixedMenu from '../FixedMenu';
import logo_stacked from '../images/logo_stacked.svg';

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
            <MainMenu/>

            <Container text>
            <br/>
              <Image src={logo_stacked} size='small' inline />
              <Header
                as='h1'
                content='Cliff Effects Tool'
                inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
              />
              <Header
                as='h2'
                content='Intake a new client to begin.'
                inverted
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
              />
              <Link to="/intake"><Button size='big' inverted>Intake New Client<Icon name='right arrow'/></Button></Link>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '8em 0em' }} vertical textAlign='center' className={'spaceholder'}/>

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
