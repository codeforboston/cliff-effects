import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div id='HomePage'>
        <div id='HomeContent'>
        <div>
          <div className="headings">
            <h1>Cliff Effects Tool</h1>
            <h2>GUIDANCE PROTOTYPE*</h2>
          </div>

          <div className='center-contents'>
            <Link to='/visit/54321/1'>
              <Button>Get Started</Button>
            </Link>

            <Link to='/about'>
              <Button>Learn More</Button>
            </Link>
          </div>

          <p>*This is a prototype and should not be used to make financial decisions.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
