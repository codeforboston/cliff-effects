// REACT COMPONENTS
import React from 'react';
import { Form, Icon, Popup } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

// PROJECT COMPONENTS
import { FormPartsContainer, ControlledRadioYesNo } from './formHelpers';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';

const LocalizedRadioYesNo = injectIntl(({ intl, checked, name, onChange }) => {
  const { messages, formatMessage } = intl;
  const children = messages[`${name}.hint`] ?
    <Popup
      trigger={<Icon name="help circle outline" />}
      content={formatMessage({ id: `${name}.hint` })}
    /> :
    null;

  return (
    <ControlledRadioYesNo
      checked={checked}
      children={children}
      labelText={formatMessage({ id: `${name}.label` })}
      name={name}
      onChange={onChange}
    />
  );
});

/** @todo description
*
* @todo Add "vertical list of options" creator that will create a list of fields using the `.field-aligner` class
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
const CurrentBenefitsContent = ({ current, setClientProperty }) => {

  return (
    <div >
      <LocalizedRadioYesNo
        checked={current.hasHousing}
        name="hasHousing"
        onChange={setClientProperty}
      />
      <LocalizedRadioYesNo
        checked={current.hasSnap}
        name="hasSnap"
        onChange={setClientProperty}
      />
    </div>
  );  // end return

};  // End CurrentBenefitsContent()

/** @todo description
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.
const CurrentBenefitsStep = (props) => {

  const setTimeProp = getTimeSetter( 'current', props.changeClient );

  return (
    <Form size='massive' className='household-size-form flex-item flex-column'>
      <FormPartsContainer
        title     = {'Current Benefits'}
        clarifier = {'Select the benefits you currently receive.'}
        right     = {{name: 'Next', func: props.nextStep}}>
          <CurrentBenefitsContent
          setClientProperty={setTimeProp}
          current={props.client.current} />
      </FormPartsContainer>

    </Form>
  );

};  // End CurrentBenefitsStep()

export { CurrentBenefitsStep };
