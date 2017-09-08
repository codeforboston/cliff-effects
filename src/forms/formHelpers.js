import React, { Component } from 'react';
import {
	Button,
  // Form,
  Grid,
  Header,
  Segment,
  // Step,
  // Card,
  // Icon,
  // Checkbox,
  Divider,
  // Radio,
  // Statistic,
  // Reveal
} from 'semantic-ui-react';


// ========================================
// COMPONENTS
// ========================================

/** Returns a Grid Column containing a button of the style used
* to navigate backwards and forwards through steps of the form.
* 
* @function
* @param {object} props
* @property {object} props.func - A function that is run when the
* button is clicked.
* @property {string} props.name - The text to be displayed on
* the button.
*/
const NavButton = ( props ) => {

  return (
    <Grid.Column className="formNav" width={3}>
      <Button color='teal' fluid size='large' onClick={() => props.func()}>{ props.name }</Button>
    </Grid.Column>
  );

};  // End PrevNext() Component


/** The row containing the "Previous" and 'Next' buttons at the
* bottom of each form page.
* 
* @function
* @param {object} propsContainer - Containing the `props` object in
* another object seemed to be the only way to pass on `props`.
* @property {object} propsContainer.props - Properties needed
* for the functional aspects of the Component. @todo Move the
* functions `previousStep()` and `nextStep()` into here if possible.
* @property {object} propsContainer.props.previousStep() - Function
* that goes back to the previous form element.
* @property {object} propsContainer.props.nextStep() - Function
* that goes forward to the next form element.
* 
* @todo Use this somehow for the first page and last page too,
* but then hide the 'previous' and the 'next' respectively? Or
* split those into their own Components?
*/
const PrevNext = ( propsContainer ) => {

  let props = propsContainer.props;

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Row>
        <NavButton name='Previous' func={ props.previousStep } />
        <Grid.Column width={10} />
        <NavButton name='Next' func={ props.nextStep } />
      </Grid.Row>
    </Grid>
  );

};  // End PrevNext() Component


/** Constructor for all the stuff that's supposed to go inside
* the Form Component. Does not include the `<Form>` Component
* as a container because it looks like that needs to be unique
* (the 'CurrentBenefitsStep' gives it `size='massive'`).
* 
* @function
* @param {object} parts
* @property {string} parts.title - Text to go in the `h1` element.
* @property {string} parts.clarifier - Text to go in the `h3`
* element, giving some description, instructions, or clarifications.
* @property {string} parts.Insertable - Component to be inserted
* into the middle - a custom form section containing inputs, etc.
* @property {Object} parts.props - properties to pass on to the
* Insertable Component.
*/
const FormPartsContainer = ( parts ) => {

  let props = parts.props,
      Insertable  = parts.Insertable;

  return (
    <Segment padded='very' style={{ minHeight: '600' }}>
      <Segment style={{ minHeight: '500' }} basic={true}>
        <Header as='h1' color='teal' textAlign='center'>
          { parts.title }
        </Header>
        <Header as='h3' textAlign='center'>
          { parts.clarifier }
        </Header>
        <Insertable props={props} />
      </Segment>
      <Divider />
      <PrevNext props={props} />
    </Segment>
  );

};  // End FormPartsContainer() Component


export { PrevNext, FormPartsContainer };
