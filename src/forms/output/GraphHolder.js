import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

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
    const { activeID }                = this.state,
          { Graph, client, snippets } = this.props,
          { current }                 = client,
          // The ids later used to access all program-specific data and functions
          // Only active programs are added
          activePrograms            = [ ...current.benefits ];

    if (activePrograms.length === 0) {
      return <Message className={ `graph-holder` }>{ snippets.i_noBenefitsSelected }</Message>;
    }

    return (
      <div className='graph-holder'>
        <GraphTimeButtons
          activeID={ activeID }
          onClick={ this.onClick } />
        <Graph
          className='client-graph'
          client={ client }
          timescale={ activeID }
          activePrograms = { activePrograms }
          snippets       = { snippets } />
      </div>
    );
  };  // End render()

};  // End <GraphHolder>


export { GraphHolder };
