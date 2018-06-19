import React, { Component } from 'react';

// Our Components
import { BenefitsLineGraph } from './BenefitsLineGraph';
import { FormPartsContainer } from '../formHelpers';
import { GraphTimeButtons } from '../../components/GraphTimeButtons';
import { StackedAreaGraph } from './StackedAreaGraph';


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


const ResultsGraph = ({ client, previousStep, resetClient }) => {

  return (
    <div className = 'result-page flex-item flex-column'>
      <FormPartsContainer
        title     = { 'Graphs' }
        left      = {{ name: 'Go Back', func: previousStep }}
        right     = {{ name: 'Reset', func: resetClient }}>
        <GraphHolder
          client={ client }
          Graph={ StackedAreaGraph } />
        <GraphHolder
          client={ client }
          Graph={ BenefitsLineGraph } />
      </FormPartsContainer>
    </div>
  );

};  // End Results()


export default ResultsGraph;

export { GraphHolder };
