// REACT COMPONENTS
import React from 'react';
import { Button } from 'semantic-ui-react';

const ResetAnytime = function (props) {

  var askToResetClient = function () {
    var promptData = {
      leaveText: 'Reset',
      message:   'default',
    };
    props.askToResetClient(promptData);
  };

  return (
    <div>
      <Button
        onClick={ askToResetClient }
        type='button'
        size='medium'
        className={ 'danger' }
        id={ 'resetFixed' }>
        New Client
      </Button>
    </div>
  );

};  // End <ResetAnytime>


export { ResetAnytime };
