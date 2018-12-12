import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

// CUSTOM COMPONENTS
import { GraphTimeButtons } from './GraphTimeButtons';


/** Keeps track of time interval currently requested
 *      (weekly/monthly/yearly) and, if needed, shows
 *      'no graph' message. */
class GraphHolder extends Component {

  constructor (props) {
    super(props);
    this.state = { activeID: `Monthly` };
  }

  onClick = (evnt) => {
    let id = evnt.target.id;
    this.setState({ activeID: id });
  };

  render () {
    const { activeID }                    = this.state,
          { Graph, client, translations } = this.props,
          { current }                     = client,
          // The ids later used to access all program-specific data and functions
          // Only active programs are added
          activePrograms                  = [ ...current.benefits ];

    if (activePrograms.length === 0) {
      return <Message className={ `graph-holder` }>{ translations.i_noBenefitsSelected }</Message>;
    }

    return (
      <div className={ `graph-holder` }>
        <GraphTimeButtons
          activeID = { activeID }
          onClick  = { this.onClick } />
        <Graph
          className      = { `client-graph` }
          client         = { client }
          timescale      = { activeID }
          activePrograms = { activePrograms }
          translations   = { translations } />
      </div>
    );
  };  // Ends render()
};  // Ends <GraphHolder>


export { GraphHolder };
