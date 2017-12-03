import React from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';

import BottomButtons from './BottomButtons';

const outerStyle = { minHeight: '600px' };
const innerStyle = { minHeight: '500px' };

/**
 * Component for all the stuff that's supposed to go inside
 * the Form Component. Does not include the `<Form>` Component
 * as a container because it looks like that needs to be unique
 * (the 'CurrentBenefitsStep' gives it `size='massive'`).
 *
 * @param {Object} props
 * @param {string} props.title - Text to go in the `h1` element.
 * @param {string} props.clarifier - Text to go in the `h3`
 * element, giving some description, instructions, or clarifications.
 * @param {string} props.children - Node(s) to be inserted
 * into the middle - a custom form section containing inputs, etc.
 * @param {Object} props.left - Optional props for the left <BottomButton>
 * @param {Object} props.right - Optional props for the right <BottomButton>
 *
 * @returns {Object} - React Element
 */
const FormPartsContainer = function({ children, clarifier, left, right, title }) {
  return (
    <Segment padded='very' style={outerStyle}>
      <Segment style={innerStyle} basic>
        <Header as='h1' color='teal' textAlign='center'>
          { title }
        </Header>
        { clarifier &&
          <Header as='h3' textAlign='center'>
            { clarifier }
          </Header>
        }
        { children }
      </Segment>
      <Divider />
      <BottomButtons left={left} right={right} />
    </Segment>
  );
};

export default FormPartsContainer;
