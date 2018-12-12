// REACT COMPONENTS
import React, { Component } from 'react';
import {
  Form,
  Button,
  Radio,
} from 'semantic-ui-react';


// @todo Change ...buttonProps to explicit `overrides` obj
// @todo Restore jsdoc container when description is more accurate
/* A big button with overridable properties.
*
* @function
* @param {object} props
* @param {object} props.children Things React can render
* @param {object} props.buttonProps Props to
*     override any default props that need to be overridden
*
* @returns {object} React element
*/
const BigButton = function ({ children, className, overrides, ...otherProps }) {

  if (!overrides) {
    overrides = {};
  };

  let allClasses = `big-button`;
  if (className) {
    allClasses += ` ` + className;
  }

  const overriddenDefaults = {
    // First adds any random prop
    ...otherProps,
    // then overrides BigButton-specific props
    type:      `button`,
    color:     `teal`,
    size:      `large`,
    className: allClasses,
    // then overrides those with props given just for that
    ...overrides,
  };

  return (
    <Button { ...overriddenDefaults }>{ children }</Button>
  );
};  // Ends <BigButton>


/** Yes/no toggleable radio button group with a label.
 *
 * @param {object} props
 * @param {string} props.labelText
 * @param {string} props.name Key for radio-group. Must
 *     be unique from all other radio names on the page.
 * @param {bool} props.checked `true` if 'yes' is selected
 *     `false` if 'no' is selected. Change will be sent out.
 * @param {function} props.onChange Is given event and adjusted
 *     input element props object. Adjustment is to make sure
 *     the property `value` is under control since there are
 *     issues further up the line.
 * 
 * @returns {object} React element
 */
class ControlledRadioYesNo extends Component {
  handleChange = (evnt, inputProps) => {
    inputProps.value = inputProps.value === `Yes`;
    this.props.onChange(evnt, inputProps);
  };

  render () {

    let {
      name,
      checked,
      labelText,
    } = this.props;

    return (
      <div className={ `radio-yes-no` }>

        <Form.Field>
          <Radio
            label    = { `Yes` }
            name     = { name }
            value    = { `Yes` }
            checked  = { checked === true }
            onChange = { this.handleChange } />
        </Form.Field>
        <Form.Field >
          <Radio
            label    = { `No` }
            name     = { name }
            value    = { `No` }
            checked  = { checked === false }
            onChange = { this.handleChange } />
        </Form.Field>
        <Form.Field >
          <b>{ labelText }</b>
        </Form.Field>

      </div>
    );
  };
};  // Ends <ControlledRadioYesNo>


// @todo description
// @todo Write callback descriptions for function params: http://usejsdoc.org/tags-callback.html
/**
 * @param {Object} props
 * @param {number|string} props.value Valid client number value
 * @param {string} props.name For HTML name property
 * @param {string} props.className HTML class names
 * @param {*} [props.otherData] Sent back to `store()`
 * @param {function} props.format Given `value`. Must return what you
 *     want shown in the number field.
 * @param {function} props.validate Given `value`. Must return boolean.
 * @param {function} props.store Given an event, `value`, [`otherData`]
 * 
 * @returns {object} React element
 */
class ManagedNumberField extends Component {
  constructor (props) {
    super(props);

    let {
      format,
      value,
    } = props;
    this.state = { valid: true, focused: false, focusedVal: format(value) };
  };

  //change form to blank string after click, before input
  handleFocus = (evnt, inputProps) => {

    let onFocus = this.props.onFocus;
    if (onFocus) {
      onFocus(evnt, inputProps);
    }

    // This makes sure that only zeroes and blanks get reset
    let {
      format,
      value,
    } = this.props;

    if (!Number.parseFloat(evnt.target.value)) {
      this.setState({ focused: true, focusedVal: `` });
    } else {
      this.setState({ focused: true, focusedVal: format(value) });
    }
  };

  handleBlur = (evnt, inputProps) => {
    let onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur(evnt, inputProps);
    }
    this.setState({ focused: false, valid: true });
  };

  handleChange = (evnt, inputProps) => {

    let onChange = this.props.onChange;
    if (onChange) {
      onChange(evnt, inputProps);
    }

    const focusedVal = inputProps.value,
          {
            displayValidator,
            storeValidator,
            store,
            otherData,
          } = this.props;

    // If doesn't pass display validator, don't store and don't change focusedVal
    if (!displayValidator(inputProps.value)) {
      return;
    }

    if (focusedVal.length === 0) {
      // If field contains an empty string, set value to be 0 (visible on blur)
      inputProps.value = `0`;
    }

    let valid = storeValidator(inputProps.value);
    if (valid) {
      store(evnt, inputProps, otherData);
    }
    this.setState({ focusedVal: focusedVal, valid: valid });
  };  // Ends handleChange()

  render () {
    const { valid, focused, focusedVal }         = this.state,
          { name, className, format, otherData } = this.props;
    let value = this.props.value;

    // @todo Bad var name. Find more useful name for this.
    let id = name;
    if (otherData && otherData.interval) {
      id = name + `_` + otherData.interval;
    }

    // Format correctly when neighbors are updated, if needed
    if (!focused) {
      value = format(value);
    } else {
      value = focusedVal;
    }

    // @todo Different class for something 'future' that has a
    // current value that isn't 0?
    // `aria` from https://www.w3.org/WAI/tutorials/forms/instructions/#using-aria-labelledby
    return (
      <Form.Input
        error     = { !valid }
        value     = { value }
        name      = { name }
        id        = { id }
        className = { className + ` output-number` }
        onChange  = { this.handleChange }
        onFocus   = { this.handleFocus }
        onBlur    = { this.handleBlur }
        aria-labelledby  = { name + `Label` }
        aria-describedby = { name + `Message` } />
    );
  }  // Ends render()

};  // Ends <ManagedNumberField>


export {
  BigButton,
  ControlledRadioYesNo,
  ManagedNumberField,
};
