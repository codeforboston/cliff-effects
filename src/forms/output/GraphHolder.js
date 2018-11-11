import React, { Component } from 'react';

// CUSTOM COMPONENTS
import { GraphTimeButtons } from '../../components/GraphTimeButtons';


class GraphHolder extends Component {

  constructor (props) {
    super(props);
    this.state = { activeID: 'Yearly' };
  }

  onClick = (evnt) => {
    var id = evnt.target.id;
    this.setState({ activeID: id });
  };

  render () {
    const { activeID }                = this.state,
          { Graph, client, snippets } = this.props,
          { current }                 = client,
          // The ids later used to access all program-specific data and functions
          // Only active programs are added
          activePrograms            = [ ...current.benefits ];

    return (
      <div className='graph-holder'>
        <Graph
          className='client-graph'
          client={ client }
          timescale={ activeID }
          activePrograms = { activePrograms }
          snippets       = { snippets } />
        <GraphTimeButtons
          activeID={ activeID }
          onClick={ this.onClick } />
      </div>
    );
  };  // End render()

};  // End <GraphHolder>


export { GraphHolder };
