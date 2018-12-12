import React from 'react';
import {
  Segment,
  Header,
  Button,
} from 'semantic-ui-react';


const DevSwitch = function ({ setDev, devProps, history }) {

  let turnOn = function () {
    setDev(`dev`, true);
    history.goBack();
  };

  let turnOff = function () {
    setDev(`dev`, false);
    history.goBack();
  };

  return (
    <Segment
      className = { `dev-switch` }
      textAlign = { `center` }>
      <Header>Dev Mode</Header>
      <Button
        disabled = { devProps.dev }
        onClick  = { turnOn }>
        On
      </Button>
      <Button
        disabled = { !devProps.dev }
        onClick  = { turnOff }>
        Off
      </Button>
    </Segment>
  );

};  // Ends <DevSwitch>


export { DevSwitch };
