// REACT COMPONENTS
import React from 'react';
import { Button } from 'semantic-ui-react';

const FeedbackAnytime = function (props) {

  return (
    <div>
      <Button
        onClick={ props.openFeedback }
        type='button'
        color='teal'
        size='medium'
        id={ 'feedbackFixed' }>
        Send Feedback
      </Button>
    </div>
  );

};  // End <FeedbackAnytime>


export { FeedbackAnytime };
