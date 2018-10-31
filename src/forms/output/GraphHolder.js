import React, { Component } from 'react';

// CUSTOM COMPONENTS
import { GraphTimeButtons } from '../../components/GraphTimeButtons';


class GraphHolder extends Component {

  constructor (props) {
    super(props);
    this.state = { activeID: 'Yearly' };
  }

  onClick = (evnt) => {
    let id = evnt.target.id;
    this.setState({ activeID: id });
  };

  render () {
    const { activeID }  = this.state,
          { Graph, client }         = this.props,
          { current }               = client,
          activePrograms            = [];

    // The ids later used to access all program-specific data and functions
    // Only active programs are added
    if (current.hasSection8) { 
      activePrograms.push('section8');
    }
    if (current.hasSnap)    {
      activePrograms.push('snap');
    }

    return (
      <div className='graph-holder'>
        <Graph
          className='client-graph'
          client={ client }
          timescale={ activeID }
          activePrograms={ activePrograms } />
        <GraphTimeButtons
          activeID={ activeID }
          onClick={ this.onClick } />
      </div>
    );
  };  // End render()

};  // End <GraphHolder>


export { GraphHolder };
