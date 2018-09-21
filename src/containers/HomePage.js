import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div id='HomePage'>
        <div id='HomeContent'>
          <div className="main-wrapper">
            <div className="headings">
              <h1>Cliff Effects Tool</h1>
              <h2>GUIDANCE PROTOTYPE*</h2>
            </div>

            <div className='center-contents'>
              <Link
                className='home-button hb-left'
                to='/visit/54321/1'>
                <Button >Get Started</Button>
              </Link>

              <Link to='/about'>
                <Button className='home-button hb-right'>Learn More</Button>
              </Link>
            </div>
          <p className="home-disclaimer">*This is a prototype and should not be used to make financial decisions.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
