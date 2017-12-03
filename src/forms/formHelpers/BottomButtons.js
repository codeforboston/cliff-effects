import React from 'react';
import { Grid } from 'semantic-ui-react';

import BottomButton from './BottomButton';

/**
 * The row containing the 'Previous' and 'Next' buttons at the
 * bottom of each form page.
 *
 * @param {Object} props
 * @param {Object} props.left - Optional props for left <BottomButton>
 * @param {Object} props.right - Optional props for right <BottomButton>
 *
 * @returns {Object} - React Element
 */
const BottomButtons = function({ left, right }){
  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Row>
        { left
          ? <BottomButton func={left.func}>{ left.name }</BottomButton>
          : <Grid.Column className='large-bottom-button' width={3}/>
        }
        <Grid.Column width={10} />
        { right
          ? <BottomButton func={right.func}>{ right.name }</BottomButton>
          : <Grid.Column className='large-bottom-button' width={3}/>
        }
      </Grid.Row>
    </Grid>
  );
};

export default BottomButtons;
