// REACT COMPONENTS
import React from 'react';
import { Button } from 'semantic-ui-react';

const ResetAnytime = function (props) {

  return (
    <div>
      <Button
        onClick={ props.askToResetClient }
        type='button'
        color='teal'
        size='medium'
        className={ 'fixed rotate' }
        id={ 'reset_fixed' }>
        New Client
      </Button>
    </div>
  );

};  // End <ResetAnytime>


export { ResetAnytime };
