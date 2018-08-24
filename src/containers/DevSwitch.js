import React from 'react';
import {
  Segment,
  Header,
  Button,
} from 'semantic-ui-react';


const DevSwitch = function ({ setDev, devMode, history }) {

  var turnOn = function () {
    setDev(`on`);
    history.goBack();
  };

  var turnOff = function () {
    setDev(`off`);
    history.goBack();
  };

  return (
    <Segment
      style = {{ margin: `10px` }}
      textAlign = { `center` } >
      <Header>Dev Mode</Header>
      <Button
        disabled = { devMode === `on` }
        onClick  = { turnOn }>
        On
      </Button>
      <Button
        disabled = { devMode === `off` }
        onClick  = { turnOff }>
        Off
      </Button>
    </Segment>
  );

};  // End <DevSwitch>


export { DevSwitch };
