// REACT COMPONENTS
import React from 'react';
import { Button } from 'semantic-ui-react';

const FeedbackAnytime = function ({ openFeedback }) {

  return (
    <div>
      <Button
        onClick = { openFeedback }
        type    = { `button` }
        color   = { `teal` }
        size    = { `medium` }
        id      = { `feedbackFixed` }>
        Tell Us More
      </Button>
    </div>
  );

};  // Ends <FeedbackAnytime>


export { FeedbackAnytime };
