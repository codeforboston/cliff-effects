// REACT COMPONENTS
import React from 'react';
import {
  // Generic Form stuff
  Header,
  Segment,
  Divider,
  Form,
} from 'semantic-ui-react';

/** For styling spacing between elements when needed.
* @returns React element
*/
const SpaceHolder = function () {
  return (<div className = { `space-holder` } />);
};


/** The row containing the big buttons at the bottom of each
 *     form section, such as 'Previous', 'Next', and 'New Client'.
 *
 * @typedef {object|null} BottomRowButton Expected is a BigButton instance.
 *
 * @function
 * @param {object} props - One object for each button
 * @param {BottomRowButton} props.left
 * @param {BottomRowButton} props.middle Currently used as a spacer
 * @param {BottomRowButton} props.right
 *
 * @returns React element
 */
const FormBottomRow = function({ left, middle, right }) {

  var Left   = <SpaceHolder key = { 'left' } />,
      Middle = <SpaceHolder key = { 'middle' } />,
      Right  = <SpaceHolder key = { 'right' } />;

  if (left) {
    Left = (<div key = { `left` }>{ left }</div>);
  }

  // Considering having a non-button as a label
  // for the section/page number. Not sure how to
  // preserve the same style.
  if (middle) {
    Middle = (<div key = { 'middle' }>{ middle }</div>);
  }

  if (right) {
    Right = (<div key = { `right` }>{ right }</div>);
  }

  var children = [
    Left,
    // Needed for first form section where there's no
    // 'Prev' button.
    Middle,
    Right,
  ];

  /* @todo Move styles to CSS */
  return (
    <div className = { `form-section-bottom-row` }>
      { children }
    </div>
  );

}; // End <FormBottomRow>


/** Constructor for all the stuff that's supposed to go inside
 *     the Form Component. Does not include the `<Form>` Component
 *     as a container because it looks like that needs to be unique
 *     (the 'CurrentBenefitsStep' gives it `size='massive'`).
 *
 * @function
 * @param {object} props
 * @param {string} props.title Text to go in the `h1` element.
 * @param {string} props.clarifier Text to go in the `h3`
 *     element, giving some description, instructions, or clarifications.
 * @param {string} props.children Component(s) to be inserted
 *     into the middle - a custom form section containing inputs, etc.
 * @param {Object} props.navData
 * @param {Object} props.formClass
 * @param {Object} props.formSize
 *
 * @returns React element
 */
const FormPartsContainer = function({ title, clarifier, children, navData, formClass, formSize }) {
  return (
    <Form
      size={ formSize || `large` }
      className= { formClass + ` flex-item flex-column` }>
      <Segment
        padded='very'
        className="flex-item flex-column">
        <Segment
          basic={ true }
          className="flex-item">
          <Header
            as='h1'
            className = { `section-header` }
            color='teal'
            textAlign='center'>
            { title }
          </Header>
          { !clarifier ? (
            null
          ) : (
            <Header
              as='h3'
              textAlign='center'>
              { clarifier }
            </Header>
          ) }

          { children }

        </Segment>

        <div id = { `section-bottom` }>
          <Divider />
          <FormBottomRow { ...navData } />
        </div>

      </Segment>
    </Form>
  );
};  // End <FormPartsContainer>


export {
  SpaceHolder,
  FormBottomRow,
  FormPartsContainer,
};
