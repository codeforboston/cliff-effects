import { Button } from 'semantic-ui-react';
import React from 'react';


const GraphButton = function ({ id, activeID, onClick }) {
  return (
    <Button
      id      = { id }
      active  = { activeID === id }
      onClick = { onClick }>
      { id }
    </Button>
  );
};

const GraphTimeButtons = function ({ activeID, onClick }) {
  return (
    <Button.Group
      basic
      className = { `graph-time-options` }>
      <GraphButton
        id       = { `Weekly` }
        activeID = { activeID }
        onClick  = { onClick } />
      <GraphButton
        id       = { `Monthly` }
        activeID = { activeID }
        onClick  = { onClick } />
      <GraphButton
        id       = { `Yearly` }
        activeID = { activeID }
        onClick  = { onClick } />
    </Button.Group>
  );
};


export {
  GraphButton,
  GraphTimeButtons,
};
