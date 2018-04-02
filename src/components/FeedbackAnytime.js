// REACT COMPONENTS
import React from 'react';
import { Button } from 'semantic-ui-react';

const FeedbackAnytime = function (props) {

  return (
    <div>
      <Button onClick={props.feedbackPrompt} type='button' color='teal' size='medium' className={'fixed rotate'} id={'feedback_fixed'}>
        Submit Feedback
      </Button>
    </div>
  );

};  // End <FeedbackAnytime>


export { FeedbackAnytime };
