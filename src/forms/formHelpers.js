// REACT COMPONENTS
import React from 'react';
import {
  // Generic Form stuff
  Header,
  Segment,
  Label,
  Divider,
  Icon,
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import { BigButton } from './inputs';


// ========================================
// GENERIC COMPONENTS
// ========================================

/**
 * Link that opens new tab
 */
const ExternalLink = function ({ href, children }) {
  return (
    <a
      href={ href }
      target='_blank'>{children}
    </a>);
};


/** For styling spacing between elements when needed.
* @returns Component
*/
const SpaceHolder = function () {
  return (<div className = { `space-holder` } />);
};


/** The row containing the big buttons at the bottom of each
*     form section, such as 'Previous', 'Next', and 'New Client'.
* 
* @object buttonProps
* @property text {string} - Text to show on the button.
* @property onClick {function} - Optional function to run on button click.
*
* @function
* @param {object} props - One object for each button
* @property {buttonProps} props.left
* @property {buttonProps} props.middle
* @property {buttonProps} props.right
*
* @returns Component
*/
const FormBottomRow = function({ left, middle, right }) {

  var Left    = <SpaceHolder key = { 'left' } />,
      Middle  = <SpaceHolder key = { 'middle' } />,
      Right   = <SpaceHolder key = { 'right' } />;

  if (left) {
    Left = (
      <BigButton
        key = { 'left' }
        onClick = { left.onClick }>
        { left.text }
      </BigButton>
    );
  }

  // Considering having a non-button as a label
  // for the page. Not sure how to preserve the
  // same style.
  if (middle) {
    Middle = (<div key = { 'middle' }>{ middle.text }</div>);
  }

  if (right) {
    Right = (
      <BigButton
        key = { 'right' }
        onClick = { right.onClick }>
        { right.text }
      </BigButton>
    );
  }

  var children = [
    Left,
    // Needed for first form section where there's no
    // 'Prev' button.
    Middle,
    Right,
  ];

  /** @todo Move styles to CSS */
  return (
    <div
      className = { `form-section-bottom-row` }
      style     = {{ display: `flex`, justifyContent: `space-between` }}>
      { children }
    </div>
  );

}; // End <FormBottomRow>


/** Constructor for all the stuff that's supposed to go inside
* the Form Component. Does not include the `<Form>` Component
* as a container because it looks like that needs to be unique
* (the 'CurrentBenefitsStep' gives it `size='massive'`).
*
* @function
* @param {object} props
* @property {string} props.title - Text to go in the `h1` element.
* @property {string} props.clarifier - Text to go in the `h3`
* element, giving some description, instructions, or clarifications.
* @property {string} props.children - Component(s) to be inserted
* into the middle - a custom form section containing inputs, etc.
* @property {Object} props.next - the 'next form section' function
* @property {Object} props.prev - the 'previous form section' function
*
* @returns Component
*/
const FormPartsContainer = function({ title, clarifier, children, navData }) {
  return (
    <Segment
      padded='very'
      className="flex-item flex-column">
      <Segment
        basic={ true }
        className="flex-item">
        <Header
          as='h1'
          color='teal'
          textAlign='center'>
          { title }
        </Header>
        { !clarifier
          ? null
          : (
            <Header
              as='h3'
              textAlign='center'>
              { clarifier }
            </Header>
          )
        }

        { children }

      </Segment>

      <Divider />
      <FormBottomRow { ...navData } />

    </Segment>
  );
};  // End FormPartsContainer() Component


/** A clearer way than a ternary operator to have a possible
* subheader. Also, clearer for separate styling
*
* @function
* @param {object} props
* @property {object} props.children - Contents of this element
*
* @returns Component
*/
const FormSubheading = function (props) {

  if (!props.children) {
    return null;
  }

  return (
    <div
      className = { 'form-subheading' }
      style={{ display: 'block', textAlign: 'left' }}>
      { props.children }
    </div>
  );

};  // End FormSubheading{} Component


/** @todo description
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
const FormHeading = function ({ subheading, children }) {

  if (!children) {
    return null;
  }

  return (
    <div className={ 'form-heading' } >
      <div /> {/** div here to make sure header margin doesn\'t collapse */}
      <Header
        as='h3'
        style={{ display: 'inline-block' }}>
        { children }
      </Header>
      <FormSubheading>{subheading}</FormSubheading>
      <br />
    </div>
  );

};  // End FormHeading{} Component


// ========================================
// INPUT CONTAINER COMPONENTS
// ========================================

/** Adds an option for an 'invalid input' message to the right of the last element */
const InvalidMessage = function ({ validRow, message }) {

  var result = null;
  if (!validRow && message) {
    result = (
      <Label
        basic
        color='red'
        pointing="left">{message}
      </Label>
    );
  }

  return result;
};  // End <InvalidMessage>


/** @todo description
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
const ColumnHeading = function ({ type, colName, style, children }) {
  var classes = type + '-column cashflow-column header ' + colName;
  return (
    <Header
      as='h4'
      className={ classes }
      style={ style }
      color='teal'>{children}
    </Header>
  );
};  // End ColumnHeading()


/** @todo description
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
const IntervalColumnHeadings = function ({ type }) {

  var columnTitle = type.toLowerCase().replace(/\b[a-z]/g, (letter) => {
        return letter.toUpperCase();
      }) + ' Type',
      styles      = { fontSize: '14px' };

  return (
    <div style={{ display: 'inline-block' }}>
      <ColumnHeading
        type={ type }
        colName='weekly'
        style={ styles }>Weekly
      </ColumnHeading>
      <ColumnHeading
        type={ type }
        colName='monthly'
        style={ styles }>Monthly
      </ColumnHeading>
      <ColumnHeading
        type={ type }
        colName='yearly'
        style={ styles }>Yearly
      </ColumnHeading>
      <ColumnHeading
        type={ type }
        colName={ type }
        style={ styles }
        columnTitle={ columnTitle }>{columnTitle}
      </ColumnHeading>
    </div>
  );

};  // End IntervalColumnHeadings{} Component


var AttentionArrow = function () {

  return (
    <span className={ 'attention-arrow' }>
      <Icon
        className = { 'attention-font' }
        fitted
        name      = { 'angle right' }
        size      = { 'big' } />
      <Icon
        className = { 'attention-font' }
        fitted
        name      = { 'angle right' }
        size      = { 'big' } />
    </span>
  );

};  // End <AttentionArrow>


/** @todo Separate into different files? */
export {
  ExternalLink, SpaceHolder,
  FormBottomRow,
  FormPartsContainer,
  FormSubheading, FormHeading,
  InvalidMessage,
  IntervalColumnHeadings, ColumnHeading,
  AttentionArrow,
};
