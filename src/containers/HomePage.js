import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class HomePage extends Component {
  render() {
    return (
      <div id='HomePage'>

        <div id='HomeContent'>

          <div style={{ display: 'inline-block' }}>

            <h1 style={{
              fontSize:     '5em',
              color:        '#efefef',
              marginBottom: '-15px', 
            }}>
              Cliff Effects Tool
            </h1>

            <h2 style={{
              fontSize:    '2em',
              color:       '#efefef',
              textAlign:   'right',
              marginTop:   '-15px',
              marginRight: '45px',
            }}>
              GUIDANCE PROTOTYPE*
            </h2>

          </div>

          <div
            className='center-contents'
            style={{
              marginTop:    '3em',
              marginBottom: '3em',
            }}>

            <div>
              <Link to='/visit/54321/1'>
                <Button style={{
                  backgroundColor: '#ffffffc8',
                  textColor:       '#00b5ad',
                  fontSize:        '1.5em',
                  marginRight:     '1.5em', 
                }}>
                Get Started
                </Button>
              </Link>

              <Link to='/about'>
                <Button style={{
                  backgroundColor: '#ffffffc8',
                  textColor:       '#00b5ad',
                  fontSize:        '1.5em',
                  marginLeft:      '1.5em',
                }}>
                Learn More
                </Button>
              </Link>
            </div>

          </div>

          <p style={{
            color:     '#efefef',
            textAlign: 'center',
            fontSize:  '1em',
          }}>*
            This is a prototype and should not be used to make financial decisions.
          </p>

        </div>

      </div>
    );
  }
}

export default HomePage;
